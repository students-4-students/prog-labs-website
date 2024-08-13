<script setup lang="ts">
  import type { ParsedContent } from '@nuxt/content';
  import {
    ScrollAreaCorner,
    ScrollAreaRoot,
    ScrollAreaViewport,
  } from 'radix-vue';

  const props = defineProps<{
    exerciseData: ParsedContent;
  }>();
</script>

<template>
  <div class="h-full bg-accent">
    <ContentRenderer :value="props.exerciseData">
      <ScrollArea class="h-full px-4">
        <ContentRendererMarkdown
          :value="props.exerciseData"
          class="py-4 pb-0 prose font-main text-justify prose-headings:text-left dark:prose-invert text-neutral-700 dark:text-neutral-200 prose-img:w-full prose-img:border prose-img:rounded-md prose-img:first:mt-0 prose-pre:bg-background prose-pre:border prose-pre:p-4 lg:prose-lg prose-code:font-code prose-code:after:content-[''] prose-code:before:content-[''] prose-h2:after:mt-2 prose-h2:font-[750] prose-h2:first:mt-0 prose-h2:after:content-[''] prose-h2:after:w-full prose-h2:after:h-0.5 prose-h2:after:block prose-h2:after:bg-primary/50 prose-h3:after:mt-1 prose-h3:after:content-[''] prose-h3:after:w-full prose-h3:after:h-0.5 prose-h3:after:block prose-h3:after:bg-primary/35 prose-a:prose-headings:font-[610] prose-a:prose-headings:pointer-events-none prose-a:prose-headings:cursor-default prose-a:prose-headings:no-underline prose-a:prose-headings:text-neutral-950 prose-a:prose-headings:dark:text-neutral-100 prose-a:font-[570] prose-a:underline-offset-[3px] prose-a:text-primary prose-strong:font-semibold prose-strong:dark:font-bold prose-strong:dark:text-[0.99em] prose-code:prose-p:bg-background prose-code:prose-p:dark:border-slate-400/25 prose-code:prose-p:break-keep prose-code:prose-p:border prose-code:prose-p:rounded prose-code:prose-p:px-2 prose-code:prose-p:m-0.5 prose-code:prose-p:inline-block prose-blockquote:border-slate-300/50 prose-ul:mt-0"
        />
        <div class="flex gap-2 [&>*]:w-full mb-4">
          <Button variant="outline" size="lg">
            <LucideCircleHelp class="h-4 mr-1" />
            J'ai besoin d'aide
          </Button>
          <Button variant="outline" size="lg">
            <LucideUsers class="h-4 mr-1" />
            À propos
          </Button>
        </div>
      </ScrollArea>
      <template #empty>
        <div class="flex h-full items-center justify-center">
          <div class="flex flex-col space-y-4 items-center justify-center">
            <NuxtImg
              class="mb-4"
              src="/illustrations/empty-box.webp"
              placeholder
            />
            <h1 class="text-center">
              Oups, il semblerait cet exercice n'existe pas.
            </h1>
            <Button @click="navigateTo('/')">
              Choisir un autre exercice
            </Button>
          </div>
        </div>
      </template>
    </ContentRenderer>
  </div>
</template>
