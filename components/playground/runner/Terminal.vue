<script setup lang="ts">
  defineProps<{
    title: string;
  }>();
</script>

<template>
  <div>
    <h5 class="mb-2 font-medium text-slate-700">
      {{ title }}
    </h5>
    <pre
      class="bg-slate-100 p-3 rounded border whitespace-break-spaces"
    ><slot /></pre>
  </div>
</template>
