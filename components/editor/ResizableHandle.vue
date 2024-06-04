<script setup lang="ts">
  const isActive = ref(false);
  // Listen for the mouseup event to allow dragging
  // if the mouse cursor is outside this component.
  useEventListener(window, 'mouseup', (_) => (isActive.value = false));
</script>

<template>
  <ResizableHandle
    class="transition-all hover:border-2 hover:border-blue-400"
    :class="{ 'border-2 border-blue-400': isActive }"
    @mousedown="isActive = true"
  />
</template>
