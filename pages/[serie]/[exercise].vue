<script setup lang="ts">
  import type { ParsedContent } from '@nuxt/content';
  import {
    getHighlighter,
    type BundledLanguage,
    type BundledTheme,
  } from 'shiki';
  import { queryExercise, querySerieFallbackLanguage } from '~/lib/content';

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

  // const { data: fallbackLanguage } = querySerieFallbackLanguage(serieName)
  const exercise = ref();
  const { data: exerciseData, status } = queryExercise(
    serieName,
    exerciseName,
    codeLanguage.value ?? fallbackLanguage.value,
  );

  watch(exerciseData, (data) => {
    if (data) {
      writtenCode.value = data.code.default;
      correctedCode.value = data.code.corrected;
    }
  });
</script>

<template>
  <Navbar is-playground />
  <!-- Modals -->
  <!-- <PlaygroundDialogExerciseCompletion default-open /> -->
  <!-- Playground loader -->
  <Transition
    leave-active-class="duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="transform opacity-0"
  >
    <div
      class="absolute z-50 flex flex-col items-center justify-center h-screen w-screen space-y-8 backdrop-blur-sm bg-background bg-opacity-35"
      v-if="status === 'pending'"
    >
      <div class="loader text-primary !text-8xl" />
      <h2 class="text-md text-center">Chargement de l'exercice</h2>
    </div>
  </Transition>
  <!-- Playground -->
  <ResizablePanelGroup direction="horizontal" class="flex w-full h-full">
    <ResizablePanel id="instructions" :min-size="25" :max-size="30">
      <div
        class="flex h-full items-center justify-center bg-accent overflow-y-scroll"
      >
        <ContentRenderer :value="<ParsedContent>exerciseData">
          <ContentRendererMarkdown
            :value="<ParsedContent>exerciseData"
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
                v-if="status !== 'pending'"
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

<style>
  .loader {
    font-family:
      Jetbrains Mono,
      monospace;
    font-weight: bold;
    font-size: 78px;
    opacity: 0.8;
  }
  .loader:before {
    content: '{';
    display: inline-block;
    animation: pulse 0.4s alternate infinite ease-in-out;
  }
  .loader:after {
    content: '}';
    display: inline-block;
    animation: pulse 0.4s 0.3s alternate infinite ease-in-out;
  }

  @keyframes pulse {
    to {
      transform: scale(0.8);
      opacity: 0.5;
    }
  }
</style>
