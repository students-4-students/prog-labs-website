<script setup lang="ts">
  // The width of each skeleton element in percentage
  const skeletonSizes = [30, 55, 40, 0, 25, 40, 35, 30, 20, 15, 0, 50, 35, 40];
</script>

<template>
  <div class="w-full space-y-2 p-4">
    <p class="font-medium mb-4 text-muted-foreground">
      Chargement de l'éditeur en cours... Cela peut prendre un moment.
    </p>
    <Skeleton
      v-for="width in skeletonSizes"
      :style="`width: ${width}%`"
      :class="`h-5`"
    />
  </div>
</template>
