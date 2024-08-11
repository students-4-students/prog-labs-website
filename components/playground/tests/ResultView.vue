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
    <pre
      class="p-4 rounded-lg border whitespace-break-spaces shadow-xl shadow-accent/45 dark:shadow-black/5"
    ><slot /></pre>
  </div>
</template>
