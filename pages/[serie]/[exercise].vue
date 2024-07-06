<script setup lang="ts">
  import type { ParsedContent } from '@nuxt/content';
  import {
    getHighlighter,
    type BundledLanguage,
    type BundledTheme,
  } from 'shiki';

  const studentData = useStudentDataStore();
  const { codeLanguage } = storeToRefs(studentData);

  // Monaco editor config
  const language: Ref<BundledLanguage> = ref('python');
  const fallbackLanguage: Ref<BundledLanguage> = ref('python');
  const supportedLanguages: BundledLanguage[] = ['java', 'cpp', 'python'];

  const themes: Record<'light' | 'dark', BundledTheme> = {
    light: 'github-light',
    dark: 'github-dark',
  };
  // TODO: Refactor dark mode
  const colorMode = useColorMode();
  const currentTheme = computed(() =>
    colorMode.value === 'dark' ? themes.dark : themes.light,
  );
  const highlighter = await getHighlighter({
    themes: Object.values(themes),
    langs: supportedLanguages,
  });

  const route = useRoute();
  const exerciseName = <string>route.params.exercise;
  const serieName = <string>route.params.serie;

  // Store the code written in each editor and set its default value
  const writtenCode = defineModel('writtenCode');
  const correctedCode = defineModel('correctedCode');

  /**
   * Load the content for the current exercise.
   */
  async function loadExercise() {
    // Check if the student has provided a valid code language
    if (codeLanguage.value === undefined) {
      return undefined;
    }

    // Update the code language to the one selected by the student
    language.value = codeLanguage.value;

    // Try to fetch the serie from the server
    const serie = await queryContent(serieName)
      .findOne()
      .catch((_) => null);

    // Load the fallback language from the serie if any
    if (serie !== null && serie.fallbackLanguage !== null) {
      fallbackLanguage.value = serie.fallbackLanguage;
    }

    // Try to fetch the exercise from the server
    let exercise = await queryContent(serieName, exerciseName, language.value)
      .findOne()
      .catch((_) => null);

    // Try to fallback to the default language for this serie,
    // if the exercise is not found for this language
    if (exercise === null) {
      language.value = fallbackLanguage.value;
      exercise = await queryContent(serieName, exerciseName, language.value)
        .findOne()
        .catch((_) => null);
    }

    // Check if the exercise exists
    if (exercise !== null) {
      // Update the page title and meta tags
      useContentHead(exercise);
      // Set the default content for the editors
      writtenCode.value = exercise.code.default;
      correctedCode.value = exercise.code.corrected;
    }
    return exercise;
  }

  // Load the content for the current exercise asynchronously
  const { data } = await useAsyncData('exercise', loadExercise, {
    watch: [codeLanguage],
  });
</script>

<template>
  <Navbar is-playground />
  <!-- Modals -->
  <!-- <PlaygroundDialogExerciseCompletion default-open /> -->
  <!-- Playground -->
  <ResizablePanelGroup direction="horizontal" class="flex w-full h-full">
    <ResizablePanel id="instructions" :min-size="25" :max-size="30">
      <div
        class="flex h-full items-center justify-center bg-accent overflow-y-scroll"
      >
        <ContentRenderer :value="<ParsedContent>data">
          <ContentRendererMarkdown
            :value="<ParsedContent>data"
            class="px-6 w-full h-full overflow-y-scroll prose dark:prose-invert prose-img:w-full prose-img:border prose-img:rounded-md prose-pre:bg-background prose-pre:border prose-pre:p-4 prose-a:no-underline lg:prose-lg text-justify"
          />
          <template #empty>
            <!-- TODO: Better fallback content -->
            <h1>Uh oh, cet exercice n'existe pas.</h1>
          </template>
        </ContentRenderer>
      </div>
    </ResizablePanel>
    <PlaygroundResizableHandle id="instructions" />
    <ResizablePanel>
      <ResizablePanelGroup id="code-terminal-group" direction="vertical">
        <ResizablePanel id="editor" :min-size="35">
          <Tabs default-value="code" class="flex flex-col h-full">
            <TabsList class="justify-start rounded-none p-0 bg-accent h-auto">
              <TabsTrigger
                value="code"
                class="rounded-none !shadow-none p-0 transition-none focus-visible:ring-0 focus-visible:ring-offset-0 border-t-2 border-b border-transparent data-[state='active']:border-t-primary data-[state='inactive']:border-b-border"
              >
                <PlaygroundTab>
                  <template #icon>
                    <LucideCode />
                  </template>
                  Série 1 / Exercice 1
                </PlaygroundTab>
              </TabsTrigger>
              <TabsTrigger
                value="correctedCode"
                class="rounded-none !shadow-none p-0 transition-none focus-visible:ring-0 focus-visible:ring-offset-0 border-t-2 border-b border-transparent data-[state='active']:border-t-primary data-[state='inactive']:border-b-border"
                :disabled="correctedCode == null"
              >
                <PlaygroundTab>
                  <template #icon>
                    <LucideBook />
                  </template>
                  Code corrigé
                </PlaygroundTab>
              </TabsTrigger>
              <!-- Add bottom border to the rest of the bar -->
              <div class="border-b grow h-full"></div>
            </TabsList>
            <TabsContent
              value="code"
              class="flex grow m-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            >
              <PlaygroundEditor
                :language="language"
                :supportedLanguages="supportedLanguages"
                :highlighter="highlighter"
                v-model:currentTheme="currentTheme"
                v-model="writtenCode"
              />
            </TabsContent>
            <TabsContent
              value="correctedCode"
              class="flex grow m-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            >
              <PlaygroundEditor
                :language="language"
                :supportedLanguages="supportedLanguages"
                :highlighter="highlighter"
                v-model:currentTheme="currentTheme"
                v-model="correctedCode"
                read-only
              />
            </TabsContent>
          </Tabs>
        </ResizablePanel>
        <PlaygroundResizableHandle id="editor" />
        <ResizablePanel id="terminal" :default-size="35" :min-size="15">
          <div class="flex flex-col h-full">
            <PlaygroundTerminal
              :highlighter="highlighter"
              :currentTheme="currentTheme"
            />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </ResizablePanel>
  </ResizablePanelGroup>
</template>
