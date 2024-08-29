<script setup lang="ts">
  import type { ParsedContent } from '@nuxt/content';
  import {
    getExerciseUrl,
    loadExerciseData,
    loadSurroundingExercises,
    type PayloadData,
    type TestSpec,
  } from './loadExercise';

  definePageMeta({
    layout: 'playground',
  });

  enum EditorTab {
    Code = 'code',
    CorrectedCode = 'correctedCode',
  }

  const nuxtApp = useNuxtApp();

  const wantsToSeeCorrectedCode = ref(false);
  const currentTab = ref(EditorTab.Code);

  const route = useRoute();
  const exerciseName = route.params.exercise.toString();
  const serieName = route.params.serie.toString();

  // Store the code written in each editor and set its default value
  const writtenCode = defineModel<string>('writtenCode');
  const correctedCode = defineModel<string>('correctedCode');

  const tests = ref<TestSpec[] | undefined>();
  const isCompleted = ref(false);

  // Load & save student data
  const studentData = useStudentDataStore();
  const { codeLanguage, sectionCode } = storeToRefs(studentData);

  // Load the content for the current exercise asynchronously
  const { data: playgroundData } = await useAsyncData<PayloadData>(
    `${serieName}-${exerciseName}-${sectionCode.value}`,
    async () =>
      await loadExerciseData(
        serieName,
        exerciseName,
        codeLanguage.value,
        'python',
      ),
    {
      watch: [sectionCode],
      getCachedData(key) {
        return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
      },
      default() {
        return { language: null, serie: null, exercise: null };
      },
    },
  );

  // Load the content for the current exercise ands
  // make the written code persists even after page reloads
  if (playgroundData.value.exercise) {
    const playgroundState = usePlaygroundStateStore();

    // Load tests for this exercise
    tests.value = playgroundData.value.exercise.tests ?? [];
    // Load the corrected code
    correctedCode.value = playgroundData.value.exercise.code?.corrected;
    writtenCode.value = playgroundData.value.exercise.code?.default;

    // Update the page title and meta tags
    useContentHead(playgroundData.value.exercise);

    // Set the default editor code based on the previous playground state
    if (
      playgroundState.writtenCode &&
      playgroundState.exercisePath === playgroundData.value.exercise?._path
    ) {
      writtenCode.value = playgroundState.writtenCode;
    } else {
      playgroundState.setWrittenCode(writtenCode.value);
      playgroundState.setCurrentExercisePath(
        playgroundData.value.exercise._path,
      );
    }

    // Automatically save the written code in the playground state
    watch(writtenCode, (code) => {
      playgroundState.setWrittenCode(code);
    });
  }

  // Load previous and next exercises
  const { data: surroundingExercises } = useAsyncData<ParsedContent[]>(
    `${serieName}-${exerciseName}-navigation`,
    async () => await loadSurroundingExercises(playgroundData.value),
    {
      watch: [sectionCode],
      getCachedData(key) {
        return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
      },
      default(): ParsedContent[] {
        return [];
      },
    },
  );

  const surroundingExerciseUrls = computed(() => {
    return Array.from({ length: 2 }, (_, i) =>
      getExerciseUrl(surroundingExercises.value[i]?._path),
    );
  });

  const editorTabName = computed(() => {
    if (playgroundData.value.exercise) {
      const { fileExtension } = getCodeLanguageData(
        playgroundData.value.language,
      );
      return `${serieName}/${exerciseName}.${fileExtension}`;
    }
    return 'Exercice non trouvé';
  });

  function resetWrittenCode(exercise: ParsedContent | null) {
    if (exercise) {
      writtenCode.value = exercise.code?.default ?? '';
    }
  }

  const editable = computed(() => {
    return currentTab.value === EditorTab.Code;
  });
</script>

<template>
  <Navbar
    :previousExerciseUrl="surroundingExerciseUrls[0]"
    :nextExerciseUrl="surroundingExerciseUrls[1]"
    is-playground
  />
  <!-- Modals -->
  <PlaygroundDialogExerciseCompletion
    v-if="isCompleted"
    :nextExerciseUrl="surroundingExerciseUrls[1]"
    @openChange="isCompleted = $event"
    default-open
  />
  <!-- Playground -->
  <ResizablePanelGroup direction="horizontal" class="flex w-full h-full">
    <ResizablePanel
      id="instructions"
      :min-size="25"
      :max-size="35"
      :default-size="30"
      class="min-w-[27.5rem]"
    >
      <LazyPlaygroundExerciseView
        :exerciseData="<ParsedContent>playgroundData.exercise"
      />
    </ResizablePanel>
    <ResizableHandle id="instructions" with-handle />
    <ResizablePanel>
      <ResizablePanelGroup id="code-terminal-group" direction="vertical">
        <ResizablePanel id="editor" :min-size="15">
          <PlaygroundTabs v-model="currentTab" :default-value="EditorTab.Code">
            <PlaygroundTabsList>
              <PlaygroundTabsTrigger :value="EditorTab.Code">
                <template #icon>
                  <LucideCode />
                </template>
                {{ editorTabName }}
              </PlaygroundTabsTrigger>
              <PlaygroundDialogCorrectedCodeWarning
                @acknowledge-warning="wantsToSeeCorrectedCode = true"
                @return-to-exercise="currentTab = EditorTab.Code"
                :only-keep-trigger="wantsToSeeCorrectedCode"
              >
                <template #trigger>
                  <PlaygroundTabsTrigger
                    :value="EditorTab.CorrectedCode"
                    :disabled="correctedCode == null"
                  >
                    <template #icon>
                      <LucideBook />
                    </template>
                    Code corrigé
                  </PlaygroundTabsTrigger>
                </template>
              </PlaygroundDialogCorrectedCodeWarning>
              <!-- Add bottom border to the rest of the bar -->
              <div class="flex border-b grow h-full items-center justify-start">
                <PlaygroundDialogResetCodeWarning
                  @acknowledge-warning="
                    resetWrittenCode(playgroundData.exercise)
                  "
                >
                  <template #trigger>
                    <Button
                      :disabled="currentTab !== EditorTab.Code"
                      variant="outline"
                      size="sm"
                      class="ml-1"
                    >
                      <LucideRotateCcw class="w-3 h-3" />
                    </Button>
                  </template>
                </PlaygroundDialogResetCodeWarning>
              </div>
            </PlaygroundTabsList>
            <KeepAlive>
              <PlaygroundTabsContent
                v-if="currentTab === EditorTab.Code"
                :value="EditorTab.Code"
                forceMount
              >
                <PlaygroundEditor
                  v-if="playgroundData.language"
                  :language="playgroundData.language"
                  v-model="writtenCode"
                />
              </PlaygroundTabsContent>
            </KeepAlive>
            <KeepAlive>
              <PlaygroundTabsContent
                v-if="currentTab === EditorTab.CorrectedCode"
                :value="EditorTab.CorrectedCode"
                forceMount
              >
                <PlaygroundEditor
                  v-if="playgroundData.language && correctedCode"
                  :language="playgroundData.language"
                  v-model="correctedCode"
                  :class="{
                    'blur-monaco-editor-code': !wantsToSeeCorrectedCode,
                  }"
                  readOnly
                />
              </PlaygroundTabsContent>
            </KeepAlive>
          </PlaygroundTabs>
        </ResizablePanel>
        <ResizableHandle id="editor" with-handle />
        <ResizablePanel
          v-if="tests && tests?.length !== 0"
          id="terminal"
          :default-size="35"
          class="min-h-16"
        >
          <PlaygroundTestsRunner
            v-if="playgroundData.exercise"
            :testSpecs="tests"
            :writtenCode="writtenCode"
            :language="playgroundData.language"
            :enabled="
              currentTab === EditorTab.Code && writtenCode !== undefined
            "
            @success="
              () => {
                isCompleted = true;
                wantsToSeeCorrectedCode = true;
              }
            "
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </ResizablePanel>
  </ResizablePanelGroup>
</template>

<style lang="css">
  /* Only blur the code and not the lines */
  .blur-monaco-editor-code .monaco-editor .overflow-guard .editor-scrollable {
    @apply blur-sm pointer-events-none;
  }
</style>
