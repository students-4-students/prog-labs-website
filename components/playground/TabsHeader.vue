<template>
  <div class="flex flex-row w-full">
    <PlaygroundTab>
      <template #icon>
        <LucideCode />
      </template>
      <slot />
    </PlaygroundTab>
    <div
      class="flex grow justify-start items-center bg-accent border-b border-border"
    >
      <slot name="bar" />
    </div>
  </div>
</template>
