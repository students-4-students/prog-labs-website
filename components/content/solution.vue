<script setup lang="ts">
  const isOpen = ref(false);
</script>

<template>
  <Collapsible class="mb-4" v-model:open="isOpen">
    <CollapsibleTrigger class="w-full">
      <div
        class="flex items-center justify-between space-x-4 rounded-md border-2 border-primary bg-primary/20 px-4 py-2 text-foreground"
      >
        <div class="font-semibold inline-flex gap-1 [&>p]:m-0">
          📖<slot name="title"> Indice </slot>
        </div>
        <LucideChevronsDownUp class="h-5 w-5" v-if="isOpen" />
        <LucideChevronsUpDown class="h-5 w-5" v-else />
      </div>
    </CollapsibleTrigger>
    <CollapsibleContent class="mt-1 rounded-md border px-4 bg-background">
      <slot />
    </CollapsibleContent>
  </Collapsible>
</template>
