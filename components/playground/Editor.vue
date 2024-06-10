<script lang="ts" setup>
  import { getHighlighter } from 'shiki';
  import { shikiToMonaco } from '@shikijs/monaco';

  const code = defineModel();
  const props = defineProps<{
    language: string;
  }>();

  const monaco = useMonaco();
  const highlighter = await getHighlighter({
    themes: ['github-light'],
    langs: ['java', 'cpp', 'python'],
  });

  if (monaco) {
    // Register the themes from Shiki, and provide syntax highlighting for Monaco.
    shikiToMonaco(highlighter, monaco);
  }
</script>

<template>
  <PlaygroundTabsHeader tabName="Série 1 / Exercice 1">
    <template #icon>
      <LucideCode />
    </template>
  </PlaygroundTabsHeader>
  <MonacoEditor
    class="w-full h-full p-4"
    v-model="code"
    :lang="language"
    :options="{
      lineNumbersMinChars: 0,
      fontSize: 16,
      minimap: {
        enabled: false,
      },
    }"
  />
</template>
