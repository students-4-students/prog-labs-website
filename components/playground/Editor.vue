<script lang="ts" setup>
  const code = defineModel();
  const props = defineProps<{
    language: string;
  }>();
</script>

<template>
  <PlaygroundTabsHeader tabName="Série 1 / Exercice 1">
    <template #icon>
      <LucideCode />
    </template>
    <template #bar> </template>
  </PlaygroundTabsHeader>
  <MonacoEditor
    class="w-full h-full p-4"
    v-model="code"
    :lang="language"
    :options="{
      automaticLayout: true,
      lineNumbersMinChars: 0,
      fontSize: 16,
      minimap: {
        enabled: false,
      },
    }"
  />
</template>
