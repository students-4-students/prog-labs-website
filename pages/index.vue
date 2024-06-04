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
      minSize: 15,
    },
  };
</script>

<template>
  <ResizablePanelGroup
    id="demo-group-1"
    direction="horizontal"
    class="flex rounded-lg border w-full h-full"
  >
    <ResizablePanel
      :id="layout.instructions.id"
      :default-size="layout.instructions.defaultSize"
      :min-size="layout.instructions.minSize"
      :max-size="layout.instructions.maxSize"
    >
      <div class="flex h-full items-center justify-center p-6">
        <span class="font-semibold">Instructions</span>
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
          <div class="flex h-full items-center justify-center p-6">
            <span class="font-semibold">Terminal</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </ResizablePanel>
  </ResizablePanelGroup>
</template>
