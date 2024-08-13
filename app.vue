<script lang="ts" setup>
  useHead({
    titleTemplate: (titleChunk) => {
      return titleChunk
        ? `${titleChunk} • S4S Programmation`
        : 'S4S Programmation';
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
