<script lang="ts" setup>
  useHead({
    titleTemplate: (titleChunk) => {
      return titleChunk ? `S4S - ${titleChunk}` : 'S4S';
    },
  });
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
  #__nuxt {
    @apply flex flex-col h-screen;
  }
</style>
