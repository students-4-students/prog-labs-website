<script lang="ts" setup>
  import { TabsContent, TabsList, TabsRoot, TabsTrigger } from 'radix-vue';
  import { cn } from '~/lib/utils';
  import Terminal from './Terminal.vue';
  import type { TestSpec } from '~/pages/[serie]/loadExercise';

  const compilers = {
    cpp: 'gcc6502_1110',
    java: 'java2100',
    python: 'python312',
  } as const;

  const selectedTab = ref('test0');

  const props = defineProps<{
    testSpecs: TestSpec[];
    code: string;
    enabled: boolean;
    language: string;
  }>();

  const emit = defineEmits<{
    (e: 'success'): void;
  }>();

  const testSpecs = toRef(props, 'testSpecs');
  const code = toRef(props, 'code');
  const language = toRef(props, 'language');

  const isRunning = ref(false);
  const run = ref<
    | {
        runId: string;
        results: {
          status: 'passed' | 'failed' | 'running';
          output?: string;
        }[];
      }
    | undefined
  >(undefined);
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

  const abortController = new AbortController();

  function runTests() {
    isRunning.value = true;

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

      const compiler = compilers[language.value as keyof typeof compilers];

      fetch(`${baseURL}/compiler/${compiler}/compile`, {
        method: 'post',
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
          lang: language,
          allowStoreCodeDebug: true,
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
        },
        signal: abortController.signal,
      })
        .then((response) => response.json())
        .then(({ timedOut, stdout, stderr, didExecute }) => {
          if (run.value?.runId !== runId) return;

          const output = [...stdout, ...stderr].map((l) => l.text).join('\n');

          run.value.results[i] = {
            status:
              didExecute &&
              !timedOut &&
              output === testSpecs.value[i].expectedOutput
                ? 'passed'
                : 'failed',
            output,
          };

          if (
            run.value.results.every((result) => result.status !== 'running')
          ) {
            isRunning.value = false;
          }

          if (run.value.results.every((result) => result.status === 'passed')) {
            emit('success');
          }
        });
    }
  }

  function abort() {
    isRunning.value = false;
    run.value = undefined;
    abortController.abort();
  }
</script>

<template>
  <div class="bg-accent h-full antialiased">
    <TabsRoot
      default-value="test0"
      orientation="vertical"
      v-model="selectedTab"
      class="flex h-full"
    >
      <TabsList class="flex flex-col w-44 h-full" aria-label="Tests">
        <div class="p-3">
          <Button
            v-if="!isRunning"
            class="w-full"
            variant="default"
            size="lg"
            @click="runTests"
            :disabled="!enabled"
          >
            <LucidePlay class="w-4 h-4 mr-1" />
            Exécuter
          </Button>
          <Button
            v-if="isRunning"
            class="w-full"
            variant="outline"
            size="lg"
            @click="abort"
          >
            <span class="contents text-red-600 dark:text-red-400">
              <LucideCircleStop class="w-4 h-4 mr-1" />
              Annuler
            </span>
          </Button>
        </div>

        <div class="flex flex-1 flex-col overflow-y-auto p-3 pt-0">
          <TabsTrigger
            v-for="(test, index) in tests"
            :value="`test${index}`"
            :class="
              cn(
                'flex gap-2 items-center px-4 py-3 w-full text-left justify-start rounded-xl border transition-colors font-medium',
                selectedTab === `test${index}`
                  ? 'bg-background text-slate-800 dark:text-slate-200'
                  : 'border-transparent text-slate-600 dark:text-slate-400',
              )
            "
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

            Test {{ index + 1 }}
          </TabsTrigger>
        </div>
      </TabsList>
      <div class="p-3 pl-0 flex-1 h-full">
        <TabsContent
          v-for="(test, index) in tests"
          :value="`test${index}`"
          class="bg-background h-full rounded-xl border overflow-y-auto overflow-x-hidden"
        >
          <div class="p-6">
            <div class="flex flex-col gap-6">
              <Terminal v-if="test.input !== undefined" title="Entrée">
                {{ test.input }}
              </Terminal>
              <Terminal v-if="test.actual !== undefined" title="Sortie">
                <div
                  :class="
                    test.actual !== test.expectedOutput &&
                    'text-red-800 dark:text-red-400'
                  "
                >
                  {{ test.actual }}
                </div>
              </Terminal>
              <Terminal
                v-if="
                  test.expectedOutput !== undefined &&
                  test.expectedOutput !== test.actual
                "
                title="Sortie attendue"
              >
                <div class="text-green-800 dark:text-green-400">
                  {{ test.expectedOutput }}
                </div>
              </Terminal>
            </div>
          </div>
        </TabsContent>
      </div>
    </TabsRoot>
  </div>
</template>
