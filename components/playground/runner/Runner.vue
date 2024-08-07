<script lang="ts" setup>
  import { TabsContent, TabsList, TabsRoot, TabsTrigger } from 'radix-vue';
  import { cn } from '~/lib/utils';
  import Terminal from './Terminal.vue';

  const selectedTab = ref('test0');

  const tests: {
    status: 'passed' | 'failed' | 'loading';
    input?: string;
    actual?: string;
    expected?: string;
  }[] = [
    {
      status: 'failed',
      input: '2',
      actual: 'Hello world',
      expected: 'Hello world\nHello world\n',
    },
    { status: 'passed', actual: 'Hello', expected: 'Hello' },
    { status: 'loading' },
    { status: 'loading' },
    {
      status: 'loading',
      input:
        'Lorem    ipsum dolor sit amet consectetur adipisicing elit.\nError quis perspiciatis harum dignissimos? Quidem velit ipsam mollitia labore deleniti amet, eligendi blanditiis natus debitis qui veniam aliquam magni modi est!',
    },
  ];
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
          <Button class="w-full" variant="default" size="lg">
            <LucidePlay class="w-4 h-4 mr-1" />
            Exécuter
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
                  ? 'bg-white text-slate-800'
                  : 'border-transparent text-slate-600',
              )
            "
          >
            <LucideLoaderCircle
              v-if="test.status === 'loading'"
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
          class="bg-white h-full rounded-xl border overflow-y-auto overflow-x-hidden"
        >
          <div class="p-6">
            <div class="flex flex-col gap-6">
              <Terminal v-if="test.input !== undefined" title="Entrée">
                {{ test.input }}
              </Terminal>
              <Terminal v-if="test.actual !== undefined" title="Sortie">
                <div :class="test.actual !== test.expected && 'text-red-800'">
                  {{ test.actual }}
                </div>
              </Terminal>
              <Terminal
                v-if="
                  test.expected !== undefined && test.expected !== test.actual
                "
                title="Sortie attendue"
              >
                <div class="text-green-800">{{ test.expected }}</div>
              </Terminal>
            </div>
          </div>
        </TabsContent>
      </div>
    </TabsRoot>
  </div>
</template>
