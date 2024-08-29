<script lang="ts" setup>
  import { TabsContent, TabsList, TabsRoot, TabsTrigger } from 'radix-vue';
  import { cn } from '~/lib/utils';
  import type { TestSpec } from '~/pages/[serie]/loadExercise';
  import * as monaco from 'monaco-editor';

  const compilers: Record<AllowedLanguage, string> = {
    cpp: 'g142',
    java: 'java2100',
    python: 'python312',
  } as const;

  const props = defineProps<{
    testSpecs: TestSpec[];
    writtenCode: string | undefined;
    enabled: boolean;
    language: AllowedLanguage;
  }>();

  const emit = defineEmits<{
    success: [];
    runStart: [];
    runEnd: [markers: monaco.editor.IMarkerData[]];
  }>();

  const selectedTab = ref<`test-${number}`>('test-0');
  const { testSpecs, writtenCode: code, language, enabled } = toRefs(props);

  const isRunning = ref(false);
  const run = ref<
    | {
        runId: string;
        results: {
          status: 'passed' | 'failed' | 'running' | 'timedout';
          output?: string;
        }[];
      }
    | undefined
  >();

  watch(testSpecs, () => {
    run.value = undefined;
  });

  const tests = computed(() => {
    if (run.value === undefined) {
      return testSpecs.value.map((spec) => ({
        ...spec,
        status: 'idle',
        actual: undefined,
      }));
    }

    return testSpecs.value.map((testSpec, index) => {
      const result = run.value!.results![index];
      return {
        ...testSpec,
        status: result.status,
        actual: result.output,
      };
    });
  });

  let abortController = new AbortController();

  /**
   * Runs the tests of the current exercise.
   */
  function runTests() {
    // Don't execute code if there's none
    if (!code.value) {
      return;
    }

    isRunning.value = true;

    // An aborted controller cannot be reused
    if (abortController.signal.aborted) {
      abortController = new AbortController();
    }

    const runId = Math.random().toString(36).slice(2);
    run.value = {
      runId,
      results: testSpecs.value.map(() => ({
        status: 'running',
        output: undefined,
      })),
    };

    for (let i = 0; i < testSpecs.value.length; i++) {
      const testSpec = testSpecs.value[i];
      const baseURL = 'https://godbolt.org/api';
      const compiler = compilers[language.value];

      emit('runStart');

      $fetch(`${baseURL}/compiler/${compiler}/compile`, {
        method: 'POST',
        body: JSON.stringify({
          source: code.value,
          compiler,
          options: {
            compilerOptions: {
              executorRequest: true,
            },
            filters: {
              execute: true,
            },
            tools: [],
            executeParameters: {
              args: '',
              stdin: testSpec.input,
            },
          },
          lang: language.value,
          allowStoreCodeDebug: true,
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
        },
        signal: abortController.signal,
        async onResponse({ response }) {
          const { timedOut, stdout, stderr, buildResult, didExecute } =
            response._data;
          if (run.value?.runId !== runId) {
            return;
          }

          const outputSources = [
            ...buildResult.stderr,
            ...buildResult.stdout,
            ...stderr,
            ...stdout,
          ];

          const output = outputSources
            .map((l) => l.text)
            .join('\n')
            // Remove ANSI escape codes
            // https://stackoverflow.com/a/29497680/4652564
            .replace(
              /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
              '',
            );

          // Show errors
          emit(
            'runEnd',
            outputSources
              .map((l) => l.tag)
              .filter(Boolean)
              .map(({ line, column, endcolumn, text, severity, file }) => ({
                // https://github.com/compiler-explorer/compiler-explorer/blob/53c04b26af9c5597660cc71fa8e6ab4e8d7f2a0b/static/panes/editor.ts#L1539

                severity,
                message: text,

                startLineNumber: line ?? 0,
                endLineNumber: line ?? 0,
                startColumn: column ?? 0,
                endColumn: endcolumn ?? Infinity,
              })),
          );

          run.value.results[i] = {
            status: timedOut
              ? 'timedout'
              : didExecute &&
                  !timedOut &&
                  output === testSpecs.value[i].expectedOutput
                ? 'passed'
                : 'failed',
            output,
          };

          // Determine if the tests have all been executed or not
          isRunning.value = run.value.results.some(
            ({ status }) => status === 'running',
          );

          // Determine if all tests were passed
          if (run.value.results.every(({ status }) => status === 'passed')) {
            emit('success');
          }
        },
      });
    }
  }

  /**
   * Cancels the ongoing test execution.
   */
  function abort() {
    isRunning.value = false;
    run.value = undefined;
    abortController.abort('User aborted');
  }
</script>

<template>
  <div class="bg-accent h-full antialiased">
    <TabsRoot
      default-value="test-0"
      orientation="horizontal"
      v-model="selectedTab"
      class="flex flex-col h-full"
    >
      <TabsList
        class="flex items-center w-full px-4 py-3 gap-3"
        aria-label="Tests"
      >
        <Button
          :variant="isRunning ? 'outline' : 'default'"
          @click="isRunning ? abort() : runTests()"
          :disabled="!enabled"
        >
          <span class="contents" v-if="!isRunning">
            <LucidePlay class="w-4 h-4 mr-1" />
            Exécuter le code
          </span>
          <span class="contents" v-else>
            <LucideCircleStop
              class="w-4 h-4 mr-1 text-red-600 dark:text-red-400"
            />
            Annuler
          </span>
        </Button>

        <div class="flex h-full">
          <TabsTrigger
            v-for="(test, index) in tests"
            :value="`test-${index}`"
            class="h-full flex gap-2 items-center px-4 py-2 text-left text-sm justify-start rounded-lg font-medium data-[state='active']:bg-background data-[state='active']:border"
          >
            <LucideMinus
              v-if="test.status === 'idle'"
              class="w-4 h-4 text-slate-400"
              title="En attente d’exécution"
            />
            <LucideLoaderCircle
              v-if="test.status === 'running'"
              class="w-4 h-4 text-slate-400 animate-spin"
              title="Exécution en cours"
            />
            <LucideCircleCheck
              v-if="test.status === 'passed'"
              class="w-4 h-4 text-emerald-500"
              title="Test réussi"
            />
            <LucideCircleX
              v-if="test.status === 'failed'"
              class="w-4 h-4 text-red-500"
              title="Test échoué"
            />
            <LucideTimerOff
              v-if="test.status === 'timedout'"
              class="w-4 h-4 text-red-500"
              title="Test échoué"
            />

            Test {{ index + 1 }}
          </TabsTrigger>
        </div>
      </TabsList>

      <div class="mx-4 flex-1 h-full">
        <TabsContent
          v-for="(test, index) in tests"
          :value="`test-${index}`"
          class="h-full"
        >
          <ScrollArea class="h-full rounded-t-lg overflow-auto">
            <div class="flex flex-col grow gap-4 p-5 pb-20 bg-background">
              <PlaygroundTestsResultView v-if="test.input" title="Texte entré">
                <pre class="p-4 whitespace-break-spaces">{{ test.input }}</pre>
              </PlaygroundTestsResultView>
              <PlaygroundTestsResultView
                v-if="
                  test.expectedOutput !== undefined &&
                  test.expectedOutput !== test.actual
                "
                title="Résultat attendu"
              >
                <div class="text-green-800 dark:text-green-400">
                  <pre class="p-4 whitespace-break-spaces">{{
                    test.expectedOutput
                  }}</pre>
                </div>
              </PlaygroundTestsResultView>
              <PlaygroundTestsResultView
                v-if="test.actual !== undefined"
                title="Résultat produit"
              >
                <div
                  class="p-4 grid gap-2 grid-cols-[auto_1fr] items-center text-red-800 dark:text-red-400"
                  v-if="test.status === 'timedout'"
                >
                  <LucideTimerOff class="w-5 h-5" />
                  <div>
                    <p>L’exécution du programme ne s’est pas finie à temps.</p>
                    <p class="text-sm">
                      Vérifie que ton programme ne soit pas coincé dans une
                      boucle infinie.
                    </p>
                  </div>
                </div>
                <pre
                  v-else
                  :class="
                    cn(
                      'p-4 whitespace-break-spaces',
                      test.actual !== test.expectedOutput &&
                        'text-red-800 dark:text-red-400',
                    )
                  "
                  >{{ test.actual }}</pre
                >
              </PlaygroundTestsResultView>
            </div>
          </ScrollArea>
        </TabsContent>
      </div>
    </TabsRoot>
  </div>
</template>
