<script setup lang="ts">
  defineProps<{
    title: string;
  }>();
</script>

<template>
  <div>
    <h5 class="mb-2 font-medium">
      {{ title }}
    </h5>
    <div
      class="rounded-lg border shadow-xl shadow-accent/45 dark:shadow-black/5 overflow-x-hidden"
    >
      <slot />
    </div>
  </div>
</template>
