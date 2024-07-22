<script lang="ts" setup>
  import {
    getHighlighter,
    type BundledLanguage,
    type BundledTheme,
    type HighlighterGeneric,
  } from 'shiki';
  import { shikiToMonaco } from '@shikijs/monaco';

  const code = defineModel<string>();
  const props = defineProps<{
    language: string;
    supportedLanguages: BundledLanguage[];
    highlighter: HighlighterGeneric<BundledLanguage, BundledTheme>;
    readOnly?: boolean;
  }>();

  const currentTheme = defineModel<BundledTheme>('currentTheme');

  const monaco = useMonaco();
  if (monaco) {
    for (const lang of props.supportedLanguages) {
      monaco.languages.register({ id: lang });
    }
    // Register the themes from Shiki, and provide syntax highlighting for Monaco.
    shikiToMonaco(props.highlighter, monaco);
    // Change theme dynamically
    watch(
      currentTheme,
      (theme) => {
        if (theme) monaco.editor.setTheme(theme);
      },
      { immediate: true },
    );
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
      fontFamily: 'JetBrains Mono',
      fontWeight: '400',
      readOnly: props.readOnly,
      minimap: {
        enabled: false,
      },
    }"
  />
</template>
