<script lang="ts" setup>
  import {
    getHighlighter,
    type BundledLanguage,
    type BundledTheme,
  } from 'shiki';
  import { shikiToMonaco } from '@shikijs/monaco';

  const code = defineModel();
  const props = defineProps<{
    language: string;
    supportedLanguages: BundledLanguage[];
    theme: BundledTheme;
    readOnly?: boolean;
  }>();

  const monaco = useMonaco();
  const highlighter = await getHighlighter({
    themes: [props.theme],
    langs: props.supportedLanguages,
  });

  if (monaco) {
    for (const lang of props.supportedLanguages) {
      monaco.languages.register({ id: lang });
    }
    // Register the themes from Shiki, and provide syntax highlighting for Monaco.
    shikiToMonaco(highlighter, monaco);
  }
</script>

<template>
  <MonacoEditor
    class="grow p-4"
    v-model="code"
    :lang="language"
    :options="{
      automaticLayout: true,
      lineNumbersMinChars: 2,
      fontSize: 16,
      readOnly: props.readOnly,
      minimap: {
        enabled: false,
      },
    }"
  />
</template>
