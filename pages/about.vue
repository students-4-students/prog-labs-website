<script setup lang="ts"></script>

<template>
  <div class="flex flex-col 2xl:flex-row px-4 md:px-8 py-8 w-full h-full gap-4">
    <div class="flex flex-col basis-7/12 gap-y-8">
      <div class="flex flex-col gap-3">
        <h2 className="text-4xl font-bold tracking-normal">
          Quelle est l'<span class="text-primary underline">équipe</span>
          derrière ce site web ?
        </h2>
        <p class="text-2xl text-foreground/85">
          Nisi veniam consectetur adipisicing velit. Sit culpa labore labore
          aliquip deserunt eu esse amet. Irure nostrud nostrud tempor nostrud
          eiusmod aliquip.
        </p>
      </div>
      <AboutCategory>
        <template #icon>
          <LucideLaptop />
        </template>
        Développeurs
      </AboutCategory>
      <div class="flex flex-wrap gap-4">
        <AboutInfo> Lorem Ipsum Lorem Ipsum </AboutInfo>
        <AboutInfo> Lorem Ipsum </AboutInfo>
        <AboutInfo> Lorem Ipsum </AboutInfo>
        <AboutInfo> Lorem Ipsum </AboutInfo>
      </div>
    </div>
    <div class="flex basis-5/12">
      <NuxtImg
        class="h-full w-full border shadow-lg object-cover rounded-xl"
        src="/illustrations/team-photo-placeholder.png"
      />
    </div>
  </div>
</template>
