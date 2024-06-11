<script setup lang="ts">
  import type { ParsedContent } from '@nuxt/content/types';
  import type { BundledLanguage } from 'shiki';

  // Monaco editor config
  const language = ref('java');
  const supportedLanguages: BundledLanguage[] = ['java', 'cpp', 'py'];
  const theme = 'github-light';

  const route = useRoute();
  const serie = <string>route.params.serie;
  const exercise = <string>route.params.exercise;

  // Fetch the content for the current exercise
  const { data } = await useAsyncData('exercise', () =>
    queryContent(serie, exercise, language.value).findOne(),
  );

  watch(data, (data) => {
    if (data != null)
      // Update the head with the exercise title
      useContentHead(data);
  });

  const writtenCode = ref(
    `
/**
 * Welcome to the Java programming environment!
 */
public class Main {
    /**
     * Program entry point.
     * This will be the first method that is called when you run your program.
     */
    public static void main(String[] args) {
      System.out.println("Hello, World!");
    }
}
`.trimStart(),
  );
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
