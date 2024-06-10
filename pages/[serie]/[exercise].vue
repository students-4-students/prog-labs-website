<script setup lang="ts">
  /*
   * User data
   */
  // Language of the monaco code editor.
  const codeLanguage = ref('java');
  const section = 'computer-science';

  const route = useRoute();
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

  watch(writtenCode, (newCode) => {
    console.log('New code:', newCode);
  });
</script>

<template>
  <Navbar is-playground />
  <ResizablePanelGroup
    id="demo-group-1"
    direction="horizontal"
    class="flex w-full h-full"
  >
    <ResizablePanel id="instructions" :min-size="25" :max-size="30">
      <div
        class="flex h-full items-center justify-center bg-slate-50 overflow-y-scroll"
      >
        <ContentDoc
          class="px-6 w-full h-full overflow-y-scroll prose prose-img:border prose-img:rounded-md prose-pre:bg-white prose-pre:border prose-pre:p-4 prose-a:no-underline lg:prose-lg text-justify"
          :path="`${section}/${route.params.serie}/${route.params.exercise}`"
        >
          <template #not-found>
            <h1>Uh oh, cet exercice n'existe pas.</h1>
          </template>
        </ContentDoc>
      </div>
    </ResizablePanel>
    <PlaygroundResizableHandle id="instructions" />
    <ResizablePanel>
      <ResizablePanelGroup id="code-terminal-group" direction="vertical">
        <ResizablePanel id="editor" :min-size="35">
          <PlaygroundEditor :language="codeLanguage" v-model="writtenCode" />
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
