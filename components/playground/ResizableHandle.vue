<script setup lang="ts">
  const isActive = ref(false);
</script>

<template>
  <ResizableHandle
    :withHandle="true"
    class="transition-all hover:border-2 hover:border-primary"
    :class="{ 'border-2 border-primary': isActive }"
    @dragging="(isDragging) => (isActive = isDragging)"
  />
</template>
