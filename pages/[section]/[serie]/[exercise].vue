<script setup lang="ts">
  // Language of the monaco code editor.
  const codeLanguage = ref('python');

  /**
   * Layout configuration for the resizable panels.
   */
  const layout = {
    instructions: {
      id: 'instructions',
      defaultSize: 35,
      minSize: 20,
      maxSize: 35,
    },
    codeEditor: {
      id: 'code-editor',
      defaultSize: 65,
      minSize: 25,
    },
    terminal: {
      id: 'terminal',
      defaultSize: 35,
      minSize: 12,
    },
  };

  const route = useRoute();
</script>

<template>
  <Navbar />
  <ResizablePanelGroup
    id="demo-group-1"
    direction="horizontal"
    class="flex border w-full h-full"
  >
    <ResizablePanel
      :id="layout.instructions.id"
      :default-size="layout.instructions.defaultSize"
      :min-size="layout.instructions.minSize"
      :max-size="layout.instructions.maxSize"
    >
      <div
        class="flex h-full items-center justify-center px-6 bg-slate-50 overflow-y-scroll"
      >
        <ContentDoc
          class="w-full h-full overflow-y-scroll overflow-x-hidden prose prose-pre:bg-slate-200 prose-pre:p-4 lg:prose-lg"
        />
      </div>
    </ResizablePanel>
    <EditorResizableHandle id="layout.instructions.id" />
    <ResizablePanel>
      <ResizablePanelGroup id="code-terminal-group" direction="vertical">
        <ResizablePanel
          :id="layout.codeEditor.id"
          :default-size="layout.codeEditor.defaultSize"
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
