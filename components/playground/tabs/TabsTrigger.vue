<template>
  <TabsTrigger
    class="text-md rounded-none !shadow-none p-0 transition-none focus-visible:ring-0 focus-visible:ring-offset-0 border-t-2 border-b border-transparent data-[state='active']:border-t-primary data-[state='inactive']:border-b-border"
  >
    <div class="flex gap-2 px-4 py-2 items-center border-r">
      <div class="[&>svg]:w-4 [&>svg]:h-4" v-if="$slots.icon">
        <slot name="icon" />
      </div>
      <p class="text-md font-medium"><slot /></p>
    </div>
  </TabsTrigger>
</template>
