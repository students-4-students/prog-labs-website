<script setup lang="ts">
  import type { ParsedContent } from '@nuxt/content';
  import { createHighlighter, type BundledTheme } from 'shiki';
  import { type LanguageData } from '~/stores/studentData';

  definePageMeta({
    layout: 'playground',
  });

  const studentData = useStudentDataStore();
  const { codeLanguage, sectionCode } = storeToRefs(studentData);

  const selectedTab: Ref<'code' | 'correctedCode'> = ref('code');

  // Monaco editor config
  const language: Ref<AllowedLanguage> = ref('python');
  const fallbackLanguage: Ref<AllowedLanguage> = ref('python');

  const themes: Record<'light' | 'dark', BundledTheme> = {
    light: 'github-light',
    dark: 'github-dark',
  };
  // TODO: Refactor dark mode
  const colorMode = useColorMode();
  const currentTheme = computed(() =>
    colorMode.value === 'dark' ? themes.dark : themes.light,
  );
  const highlighter = await createHighlighter({
    themes: Object.values(themes),
    langs: ALLOWED_LANGUAGES,
  });

  const route = useRoute();
  const exerciseName = <string>route.params.exercise;
  const serieName = <string>route.params.serie;

  // Store the code written in each editor and set its default value
  const writtenCode = defineModel('writtenCode');
  const correctedCode = defineModel('correctedCode');

  const selectedCode = computed(() =>
    selectedTab.value == 'code' ? writtenCode : correctedCode,
  );

  const validator = {
    solver: null,
    unresolvedTests: [],

    set(data: object) {
      if (typeof data == null) return;

      this.solver = eval?.(`"use strict";(${data.solver})`);
      this.unresolvedTests = data.tests;
    },

    evaluateInSolver(str: string) {
      const extractedAttributes = { ...validator.solver };

      // Change properties as if they are called from the solver
      for (const key in extractedAttributes) {
        if (typeof extractedAttributes[key] === 'function') {
          extractedAttributes[key] = extractedAttributes[key].bind(this.solver);
        }
      }

      // Attributes are used as arguments to their names
      const argNames = Object.keys(extractedAttributes);
      const argValues = argNames.map((key) => extractedAttributes[key]);

      // Call in the context of the solver
      const func = new Function(...argNames, `"use strict";return (${str});`);

      return func(...argValues);
    },

    resolveTest(test: object) {
      if ('output' in test) {
        return [
          {
            input: test.input,
            output: test.output,
          },
        ];
      }

      let input = test.input;
      const shouldBeResolved = !(test.resolved ?? true);

      if (shouldBeResolved) {
        input = validator.evaluateInSolver(input);
      }

      const multiple = test.multiple ?? false;
      if (!multiple) {
        input = [input];
      }

      const tests = [];
      for (const individualInput of input) {
        const individualTest = {
          input: individualInput,
          output: validator.solver.solve(individualInput),
        };
        tests.push(individualTest);
      }

      return tests;
    },

    getTests() {
      return this.unresolvedTests.flatMap(this.resolveTest);
    },
  };

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
    const serieData = await queryContent(serieName)
      .only(['fallbackLanguage'])
      .findOne()
      .catch((_) => null);

    // Load the fallback language from the serie if any
    if (serieData !== null && serieData.fallbackLanguage !== null) {
      fallbackLanguage.value = <AllowedLanguage>(
        (<unknown>serieData.fallbackLanguage)
      );
    }

    // Try to fetch the exercise from the server
    let exercise = await queryContent(serieName, exerciseName, language.value)
      .findOne()
      .catch((_) => null);

    // Try to fallback to the default language for this serie,
    // if the exercise is not found for this language
    if (
      exercise === null &&
      fallbackLanguage !== null &&
      fallbackLanguage.value !== language.value
    ) {
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

    validator.set(exercise?.validation);

    return exercise;
  }

  // Load the content for the current exercise asynchronously
  const { data: exerciseData, error } = await useAsyncData(
    `${serieName}-${exerciseName}-${sectionCode.value}`,
    loadExercise,
    {
      watch: [sectionCode],
    },
  );

  const editorTabName = computed(() => {
    if (exerciseData.value !== null) {
      const upperCaseSerieName =
        serieName.charAt(0).toUpperCase() + serieName.slice(1);
      const { fileExtension } = getCodeLanguageData(
        language.value ?? fallbackLanguage.value,
      );
      return `${upperCaseSerieName}/${exerciseName}.${fileExtension}`;
    }
    return 'Exercice non trouvé';
  });

  const userLanguageData = computed(() =>
    getCodeLanguageData(language.value ?? fallbackLanguage.value),
  );
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
        <ContentRenderer :value="<ParsedContent>exerciseData">
          <ContentRendererMarkdown
            :value="<ParsedContent>exerciseData"
            class="px-6 w-full h-full overflow-y-scroll prose dark:prose-invert prose-img:w-full prose-img:border prose-img:rounded-md prose-pre:bg-background prose-pre:border prose-pre:p-4 prose-a:no-underline lg:prose-lg text-justify"
          />
          <template #empty>
            <!-- TODO: Better fallback content -->
            <div class="flex flex-col space-y-4 items-center justify-center">
              <NuxtImg
                class="mb-4"
                src="/illustrations/empty-box.png"
                placeholder
              />
              <h1 class="text-center">
                Oups, il semblerait cet exercice n'existe pas.
              </h1>
              <Button @click="navigateTo('/')">
                Choisir un autre exercice
              </Button>
            </div>
          </template>
        </ContentRenderer>
      </div>
    </ResizablePanel>
    <ResizableHandle id="instructions" with-handle />
    <ResizablePanel>
      <ResizablePanelGroup id="code-terminal-group" direction="vertical">
        <ResizablePanel id="editor" :min-size="35">
          <Tabs
            default-value="code"
            v-model="selectedTab"
            class="flex flex-col h-full"
          >
            <TabsList class="justify-start rounded-none p-0 bg-accent h-auto">
              <TabsTrigger
                value="code"
                class="rounded-none !shadow-none p-0 transition-none focus-visible:ring-0 focus-visible:ring-offset-0 border-t-2 border-b border-transparent data-[state='active']:border-t-primary data-[state='inactive']:border-b-border"
              >
                <PlaygroundTab>
                  <template #icon>
                    <LucideCode />
                  </template>
                  {{ editorTabName }}
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
            <TabsContent value="code" class="flex-1">
              <PlaygroundEditor
                v-if="exerciseData"
                :language="language"
                :supportedLanguages="ALLOWED_LANGUAGES"
                :highlighter="highlighter"
                v-model:currentTheme="currentTheme"
                v-model="writtenCode"
              />
            </TabsContent>
            <TabsContent value="correctedCode" class="flex-1">
              <PlaygroundEditor
                :language="language"
                :supportedLanguages="ALLOWED_LANGUAGES"
                :highlighter="highlighter"
                v-model:currentTheme="currentTheme"
                v-model="correctedCode"
                read-only
              />
            </TabsContent>
          </Tabs>
        </ResizablePanel>
        <ResizableHandle id="editor" with-handle />
        <ResizablePanel id="terminal" :default-size="35" :min-size="15">
          <div class="flex flex-col h-full">
            <PlaygroundTerminal
              :highlighter="highlighter"
              :currentTheme="currentTheme"
              :selected="selectedTab"
              :selectedCode="selectedCode"
              :validator="validator"
              :languageData="userLanguageData"
            />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </ResizablePanel>
  </ResizablePanelGroup>
</template>
