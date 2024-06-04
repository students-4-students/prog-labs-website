<script setup lang="ts">
  const isActive = ref(false);
</script>

<template>
  <ResizableHandle
    class="transition-all hover:border-2 hover:border-blue-400"
    :class="{ 'border-2 border-blue-400': isActive }"
    @dragging="(isDragging) => (isActive = isDragging)"
  />
</template>
