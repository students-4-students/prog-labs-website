<script setup lang="ts">
  import type { ParsedContent } from '@nuxt/content';
  import { createHighlighter, type BundledTheme } from 'shiki';
  import {
    getExerciseUrl,
    loadExerciseIntoPlayground,
    loadSurroundingExercises,
  } from './loadExercise';

  definePageMeta({
    layout: 'playground',
  });

  const studentData = useStudentDataStore();
  const { codeLanguage, sectionCode } = storeToRefs(studentData);

  const themes: Record<'light' | 'dark', BundledTheme> = {
    light: 'github-light',
    dark: 'github-dark',
  };

  const colorMode = useColorMode();
  const currentTheme = computed(() =>
    colorMode.value === 'dark' ? themes.dark : themes.light,
  );

  const highlighter = await createHighlighter({
    themes: Object.values(themes),
    langs: ALLOWED_LANGUAGES,
  });

  const route = useRoute();
  const exerciseName = route.params.exercise.toString();
  const serieName = route.params.serie.toString();

  // Store the code written in each editor and set its default value
  const writtenCode = defineModel<string>('writtenCode');
  const correctedCode = defineModel<string>('correctedCode');

  // Load the content for the current exercise asynchronously
  const { data: playgroundData } = await useAsyncData(
    `${serieName}-${exerciseName}-${sectionCode.value}`,
    async () =>
      await loadExerciseIntoPlayground(
        serieName,
        exerciseName,
        codeLanguage.value,
        writtenCode,
        correctedCode,
      ),
    {
      watch: [sectionCode],
      default() {
        return { language: null, serie: null, exercise: null };
      },
    },
  );

  const { data: surroundingExercises } = useAsyncData(
    `${serieName}-${exerciseName}-navigation`,
    async () =>
      await loadSurroundingExercises(
        playgroundData.value.exercise,
        playgroundData.value.language,
      ),
    {
      default(): ParsedContent[] {
        return [];
      },
    },
  );

  const previousExerciseUrl = computed(() =>
    getExerciseUrl(surroundingExercises.value[0]?._path),
  );

  const nextExerciseUrl = computed(() =>
    getExerciseUrl(surroundingExercises.value[1]?._path),
  );

  const editorTabName = computed(() => {
    if (playgroundData.value.exercise) {
      const { fileExtension } = getCodeLanguageData(
        playgroundData.value.language,
      );
      return `${serieName}/${exerciseName}.${fileExtension}`;
    }
    return 'Exercice non trouvé';
  });

  function resetExercise() {
    if (playgroundData.value.exercise) {
      writtenCode.value = playgroundData.value.exercise.code?.default ?? '';
    }
  }
</script>

<template>
  <!-- Modals -->
  <PlaygroundDialogExerciseCompletion default-open />
  <!-- Playground -->
  <Navbar
    :previousExercisePath="previousExerciseUrl"
    :nextExercisePath="nextExerciseUrl"
    is-playground
  />
  <ResizablePanelGroup direction="horizontal" class="flex w-full h-full">
    <ResizablePanel
      id="instructions"
      :min-size="25"
      :max-size="35"
      :default-size="30"
      class="min-w-[27.5rem]"
    >
      <PlaygroundExerciseView
        :exerciseData="<ParsedContent>playgroundData.exercise"
      />
    </ResizablePanel>
    <ResizableHandle id="instructions" with-handle />
    <ResizablePanel>
      <ResizablePanelGroup id="code-terminal-group" direction="vertical">
        <ResizablePanel id="editor" :min-size="35">
          <PlaygroundTabs default-value="code">
            <PlaygroundTabsList>
              <PlaygroundTabsTrigger value="code">
                <template #icon>
                  <LucideCode />
                </template>
                {{ editorTabName }}
              </PlaygroundTabsTrigger>
              <PlaygroundTabsTrigger
                value="correctedCode"
                :disabled="correctedCode == null"
              >
                <template #icon>
                  <LucideBook />
                </template>
                Code corrigé
              </PlaygroundTabsTrigger>
              <!-- Add bottom border to the rest of the bar -->
              <div class="flex border-b grow h-full items-center justify-start">
                <Button
                  @click="resetExercise()"
                  variant="outline"
                  size="sm"
                  class="ml-1"
                >
                  <LucideRotateCcw class="w-3 h-3" />
                </Button>
              </div>
            </PlaygroundTabsList>
            <PlaygroundTabsContent value="code">
              <PlaygroundEditor
                v-if="playgroundData.exercise"
                :language="playgroundData.language"
                :supportedLanguages="ALLOWED_LANGUAGES"
                :highlighter="highlighter"
                v-model:currentTheme="currentTheme"
                v-model="writtenCode"
              />
            </PlaygroundTabsContent>
            <PlaygroundTabsContent value="correctedCode">
              <PlaygroundEditor
                v-if="playgroundData.exercise && correctedCode !== null"
                :language="playgroundData.language"
                :supportedLanguages="ALLOWED_LANGUAGES"
                :highlighter="highlighter"
                v-model:currentTheme="currentTheme"
                v-model="correctedCode"
                read-only
              />
            </PlaygroundTabsContent>
          </PlaygroundTabs>
        </ResizablePanel>
        <ResizableHandle id="editor" with-handle />
        <ResizablePanel id="terminal" :default-size="30" class="min-h-12">
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
