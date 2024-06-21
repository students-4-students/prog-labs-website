<script setup lang="ts">
  import type { ParsedContent } from '@nuxt/content';
  import type { BundledLanguage, BundledTheme } from 'shiki';

  const studentData = useStudentDataStore();
  if (studentData.codeLanguage === undefined) {
    await navigateTo('/');
  }

  // Monaco editor config
  const language = ref(<BundledLanguage>studentData.codeLanguage);
  const fallbackLanguage: BundledLanguage = 'python';
  const supportedLanguages: BundledLanguage[] = ['java', 'cpp', 'python'];
  const theme: BundledTheme = 'github-light';

  const route = useRoute();
  const exercise = <string>route.params.exercise;
  const serie = <string>route.params.serie;

  // Store the code written in each editor and set its default value
  const writtenCode = defineModel('writtenCode');
  const correctedCode = defineModel('correctedCode');

  /**
   * Load the content for the current exercise.
   */
  async function loadExercise() {
    // Try to fetch the exercise from the server
    let data = await queryContent(serie, exercise, language.value)
      .findOne()
      .catch((_) => null);

    // Try to fallback to the default language for this serie,
    // if the exercise is not found for this language
    if (data === null) {
      language.value = fallbackLanguage;
      data = await queryContent(serie, exercise, fallbackLanguage)
        .findOne()
        .catch((_) => null);
    }

    // Check if the exercise exists
    if (data !== null) {
      // Update the page title and meta tags
      useContentHead(data);
      // Set the default content for the editors
      writtenCode.value = data.defaultCode;
      correctedCode.value = data.correctedCode;
    }
    return data;
  }

  // Load the content for the current exercise asynchronously
  const { data } = await useAsyncData('exercise', loadExercise, {
    watch: [language],
  });
</script>

<template>
  <Navbar is-playground />
  <ResizablePanelGroup direction="horizontal" class="flex w-full h-full">
    <ResizablePanel id="instructions" :min-size="25" :max-size="30">
      <div
        class="flex h-full items-center justify-center bg-slate-50 overflow-y-scroll"
      >
        <ContentRenderer :value="<ParsedContent>data">
          <ContentRendererMarkdown
            :value="<ParsedContent>data"
            class="px-6 w-full h-full overflow-y-scroll prose prose-img:border prose-img:rounded-md prose-pre:bg-white prose-pre:border prose-pre:p-4 prose-a:no-underline lg:prose-lg text-justify"
          />
          <template #empty>
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
            <TabsList class="justify-start rounded-none p-0 bg-slate-50 h-auto">
              <TabsTrigger
                value="code"
                class="rounded-none !shadow-none p-0 transition-none focus-visible:ring-0 focus-visible:ring-offset-0 border-t-2 border-b border-transparent data-[state='active']:border-t-blue-400 data-[state='inactive']:border-b-border"
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
                class="rounded-none !shadow-none p-0 transition-none focus-visible:ring-0 focus-visible:ring-offset-0 border-t-2 border-b border-transparent data-[state='active']:border-t-blue-400 data-[state='inactive']:border-b-border"
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
                :theme="theme"
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
                :theme="theme"
                v-model="correctedCode"
                read-only
              />
            </TabsContent>
          </Tabs>
        </ResizablePanel>
        <PlaygroundResizableHandle id="editor" />
        <ResizablePanel id="terminal" :default-size="35" :min-size="15">
          <div class="flex flex-col h-full">
            <PlaygroundTerminal :theme="theme" />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </ResizablePanel>
  </ResizablePanelGroup>
</template>
