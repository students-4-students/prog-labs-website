<template>
  <Navbar is-playground />
  <!-- Displays a loader when the playground is loading -->
  <Suspense>
    <!-- Playground when loaded -->
    <slot />
    <!-- Exercise load screen -->
    <template #fallback>
      <div
        class="absolute z-50 flex flex-col items-center justify-center h-screen w-screen space-y-8 bg-background"
      >
        <div class="loader text-primary text-8xl" />
        <h2 class="text-md text-center">Chargement de l'exercice</h2>
      </div>
    </template>
  </Suspense>
</template>

<style>
  .loader {
    font-family:
      Jetbrains Mono,
      monospace;
    font-weight: bold;
    opacity: 0.8;
  }
  .loader:before {
    content: '{';
    display: inline-block;
    animation: pulse 0.4s alternate infinite ease-in-out;
  }
  .loader:after {
    content: '}';
    display: inline-block;
    animation: pulse 0.4s 0.3s alternate infinite ease-in-out;
  }

  @keyframes pulse {
    to {
      transform: scale(0.8);
      opacity: 0.5;
    }
  }
</style>
