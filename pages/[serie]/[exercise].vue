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
  let writtenCode = defineModel();
  const { data } = await useAsyncData('exercise', async () => {
    const data = await queryContent(serie, exercise, language.value).findOne();
    if (data != null) {
      useContentHead(data); // Update the page title and meta tags
      writtenCode.value = data.defaultCode ?? ''; // Set the default code if it exists
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
          <PlaygroundEditor
            :language="language"
            :supportedLanguages="supportedLanguages"
            :theme="theme"
            v-model="writtenCode"
          />
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
