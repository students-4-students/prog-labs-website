<script setup lang="ts">
  /*
   * User data
   */
  // Language of the monaco code editor.
  const codeLanguage = ref('java');
  const section = 'computer-science';

  /**
   * Layout configuration for the resizable panels.
   */
  const layout = {
    instructions: {
      id: 'instructions',
      defaultSize: 30,
      minSize: 20,
      maxSize: 30,
    },
    codeEditor: {
      id: 'code-editor',
      minSize: 35,
    },
    terminal: {
      id: 'terminal',
      defaultSize: 25,
      minSize: 15,
    },
  };

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
</script>

<template>
  <ResizablePanelGroup
    id="demo-group-1"
    direction="horizontal"
    class="flex w-full h-full"
  >
    <ResizablePanel
      :id="layout.instructions.id"
      :default-size="layout.instructions.defaultSize"
      :min-size="layout.instructions.minSize"
      :max-size="layout.instructions.maxSize"
    >
      <div
        class="flex h-full items-center justify-center bg-slate-50 overflow-y-scroll"
      >
        <ContentDoc
          class="p-6 w-full h-full overflow-y-scroll prose prose-pre:bg-white prose-pre:border prose-pre:p-4 lg:prose-lg text-justify"
          :path="`${section}/${route.params.serie}/${route.params.exercise}`"
        >
          <template #not-found>
            <h1>Uh oh, cet exercice n'existe pas.</h1>
          </template>
        </ContentDoc>
      </div>
    </ResizablePanel>
    <EditorResizableHandle :id="layout.instructions.id" />
    <ResizablePanel>
      <ResizablePanelGroup id="code-terminal-group" direction="vertical">
        <ResizablePanel
          :id="layout.codeEditor.id"
          :min-size="layout.codeEditor.minSize"
        >
          <MonacoEditor
            class="w-full h-full p-4"
            v-model.lazy="writtenCode"
            :lang="codeLanguage"
            :options="{
              automaticLayout: true,
              lineNumbersMinChars: 0,
              fontSize: 16,
              minimap: {
                enabled: false,
              },
            }"
          />
        </ResizablePanel>
        <EditorResizableHandle :id="layout.codeEditor.id" />
        <ResizablePanel
          :id="layout.terminal.id"
          :default-size="layout.terminal.defaultSize"
          :min-size="layout.terminal.minSize"
        >
          <div class="flex flex-col h-full">
            <EditorTerminal />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </ResizablePanel>
  </ResizablePanelGroup>
</template>
