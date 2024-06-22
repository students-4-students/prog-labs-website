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
      class="flex grow justify-start items-center mr-8 bg-accent border-b border-border"
    >
      <slot name="bar" />
    </div>
  </div>
</template>
