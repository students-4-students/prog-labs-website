<script setup lang="ts">
  import type { ParsedContent } from '@nuxt/content/types';
  import type { BundledLanguage } from 'shiki';

  // Monaco editor config
  const language = ref('java');
  const supportedLanguages: BundledLanguage[] = ['java', 'cpp', 'python'];
  const theme = 'github-light';

  const route = useRoute();
  const serie = <string>route.params.serie;
  const exercise = <string>route.params.exercise;

  // Fetch the content for the current exercise
  const writtenCode = defineModel('writtenCode');
  const correctedCode = defineModel('correctedCode');
  // Load the content for the current exercise
  const { data } = await useAsyncData('exercise', async () => {
    const data = await queryContent(serie, exercise, language.value).findOne();
    if (data != null) {
      useContentHead(data); // Update the page title and meta tags
      writtenCode.value = data.defaultCode ?? ''; // Set the default code if it exists
      correctedCode.value = data.correctedCode ?? ''; // Set the corrected code if it exists
    }
    return data;
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
          <Tabs default-value="code" class="w-full h-full">
            <TabsList
              class="flex justify-start rounded-none px-0 border-b bg-slate-50"
            >
              <TabsTrigger
                value="code"
                class="rounded-none !shadow-none p-0 transition-none"
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
                class="rounded-none !shadow-none p-0 transition-none"
              >
                <PlaygroundTab>
                  <template #icon>
                    <LucideBook />
                  </template>
                  Code corrigé
                </PlaygroundTab>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="code" class="h-full m-0">
              <PlaygroundEditor
                :language="language"
                :supportedLanguages="supportedLanguages"
                :theme="theme"
                v-model="writtenCode"
              />
            </TabsContent>
            <TabsContent value="correctedCode" class="h-full m-0">
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
        <ResizablePanel id="terminal" :default-size="25" :min-size="15">
          <div class="flex flex-col h-full">
            <PlaygroundTerminal />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </ResizablePanel>
  </ResizablePanelGroup>
</template>
