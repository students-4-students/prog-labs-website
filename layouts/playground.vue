<template>
  <!-- Displays a loader when the playground is loading -->
  <Suspense>
    <!-- Playground when loaded -->
    <slot />
    <!-- Exercise load screen -->
    <template #fallback>
      <div
        class="absolute z-50 flex flex-col items-center justify-center h-screen w-screen space-y-8 bg-background"
      >
        <div class="loader text-primary !text-8xl" />
        <h2 class="text-md text-center">Chargement de l'exercice</h2>
      </div>
    </template>
  </Suspense>
</template>
