<template>
  <div class="flex gap-2 px-4 py-2 items-center border-r">
    <div class="[&>svg]:w-4 [&>svg]:h-4" v-if="$slots.icon">
      <slot name="icon" />
    </div>
    <p class="text-md font-medium"><slot /></p>
  </div>
</template>
