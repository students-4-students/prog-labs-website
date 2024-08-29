<script lang="ts" setup>
  defineProps<{
    totalRating: number;
  }>();

  const value = defineModel<number>({ required: true });
</script>

<template>
  <div class="flex items-center gap-1">
    <span
      @click="value = star"
      v-for="star in totalRating"
      :key="star"
      class="cursor-pointer hover:text-orange-400"
    >
      <LucideStar
        class="h-6 w-6"
        :class="{ 'fill-orange-400 text-orange-400': star <= value }"
      />
    </span>
  </div>
</template>
