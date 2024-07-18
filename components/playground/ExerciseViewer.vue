<script setup lang="ts">
  import type { ParsedContent } from '@nuxt/content';

  defineProps(['exerciseData']);
</script>

<style lang="css">
  @font-face {
    font-family: 'Inter';
    src: url('/fonts/Inter/InterVariable.woff2');
  }
  @font-face {
    font-family: 'JetBrainsMono';
    src: url('/fonts/JetBrainsMono-2.304/fonts/variable/JetBrainsMono[wght].ttf');
  }
</style>

<template>
  <div class="flex h-full items-center justify-center bg-accent">
    <ScrollArea class="h-full">
      <ContentRenderer :value="<ParsedContent>$props.exerciseData">
        <ContentRendererMarkdown
          :value="<ParsedContent>$props.exerciseData"
          class="p-4 prose font-main dark:prose-invert dark:text-neutral-100 prose-p:text-justify prose-img:w-full prose-img:border prose-img:rounded-md prose-pre:bg-background prose-pre:border prose-pre:p-4 prose-a:no-underline lg:prose-lg prose-code:font-code prose-code:after:content-[''] prose-code:before:content-[''] prose-h2:font-[750] prose-h2:first:mt-0 prose-h2:after:content-[''] prose-h2:after:w-full prose-h2:after:h-0.5 prose-h2:after:block prose-h2:after:bg-slate-400/50 prose-h2:dark:after:bg-slate-300/50 prose-h3:after:content-[''] prose-h3:after:w-full prose-h3:after:h-0.5 prose-h3:after:block prose-h3:after:bg-slate-300/75 prose-h3:dark:after:bg-slate-300/50 prose-a:font-[610] prose-a:pointer-events-none prose-a:cursor-default prose-strong:font-semibold prose-strong:dark:font-bold prose-strong:dark:text-[0.99em] prose-p:text-neutral-800 prose-p:dark:text-neutral-100 prose-code:prose-p:bg-slate-300 prose-code:prose-p:dark:bg-neutral-800/75 prose-code:prose-p:dark:border-slate-400/25 prose-code:prose-p:break-keep prose-code:prose-p:dark:border-[1px] prose-code:prose-p:rounded prose-code:prose-p:px-2 prose-code:prose-p:m-0.5 prose-code:prose-p:inline-block prose-blockquote:border-slate-300/50 prose-ul:mt-0"
        />
        <template #empty>
          <!-- TODO: Better fallback content -->
          <div class="flex flex-col space-y-4 items-center justify-center">
            <NuxtImg
              class="mb-4"
              src="/illustrations/empty-box.png"
              placeholder
            />
            <h1 class="text-center">
              Oups, il semblerait cet exercice n'existe pas.
            </h1>
            <Button @click="navigateTo('/')">
              Choisir un autre exercice
            </Button>
          </div>
        </template>
      </ContentRenderer>
    </ScrollArea>
  </div>
</template>
