<script lang="ts" setup>
  defineProps<{
    tabName: string;
  }>();
</script>

<template>
  <div class="flex flex-row w-full">
    <PlaygroundTab>
      <template #icon>
        <LucideCode />
      </template>
      {{ tabName }}
    </PlaygroundTab>
    <div
      class="flex grow justify-start items-center mr-8 bg-slate-50 border-b border-l border-border"
    >
      <slot name="bar" />
    </div>
  </div>
</template>
