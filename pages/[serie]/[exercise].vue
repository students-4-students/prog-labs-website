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
      minSize: 25,
    },
    terminal: {
      id: 'terminal',
      minSize: 12,
    },
  };

  const route = useRoute();
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
            :lang="codeLanguage"
            :options="{
              automaticLayout: true,
              glyphMargin: false,
              folding: false,
              lineNumbersMinChars: 0,
              minimap: {
                enabled: false,
              },
            }"
          />
        </ResizablePanel>
        <EditorResizableHandle :id="layout.codeEditor.id" />
        <ResizablePanel
          :id="layout.terminal.id"
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
