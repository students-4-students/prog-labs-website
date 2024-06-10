<script lang="ts" setup>
  defineProps<{
    tabName: string;
  }>();
</script>

<template>
  <div class="flex flex-row w-full">
    <div class="flex gap-2 px-4 py-2 items-center">
      <div class="[&>svg]:w-4 [&>svg]:h-4">
        <slot name="icon" />
      </div>
      <p class="text-md font-medium">{{ tabName }}</p>
    </div>
    <div
      class="flex grow justify-start items-center mr-8 bg-slate-50 border-b border-l border-border"
    >
      <slot name="bar" />
    </div>
  </div>
</template>
