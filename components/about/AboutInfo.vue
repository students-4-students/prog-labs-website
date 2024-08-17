<script setup lang="ts">
  const props = defineProps<{
    name: string;
    photoUrl?: string;
  }>();
</script>

<template>
  <div class="flex flex-col space-y-1 w-28">
    <NuxtImg
      class="border rounded-lg aspect-square"
      :src="props.photoUrl ?? '/person-placeholder.png'"
    />
    <p class="text-lg font-semibold text-foreground max-full">
      {{ props.name }}
    </p>
  </div>
</template>
