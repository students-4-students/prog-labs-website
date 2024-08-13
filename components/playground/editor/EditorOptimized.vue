<template>
  <PlaygroundEditorSkeleton v-if="!hasEditorLoaded && displayLoader" />
  <DelayHydration>
    <LazyPlaygroundEditorWrapper
      @update:load="hasEditorLoaded = true"
      v-bind="$props"
      v-model="writtenCode"
    />
  </DelayHydration>
</template>

<script lang="ts" setup>
  import type { EditorProps, EditorEmits } from '.';

  defineProps<EditorProps>();
  defineEmits<EditorEmits>();

  const displayLoader = ref(false);
  const hasEditorLoaded = ref(false);
  const writtenCode = defineModel<string>();

  onMounted(() => {
    setTimeout(() => {
      displayLoader.value = true;
    }, 1000);
  });
</script>
