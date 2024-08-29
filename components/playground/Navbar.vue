<script lang="ts" setup>
  const props = defineProps<{
    previousExerciseUrl?: string;
    nextExerciseUrl?: string;
  }>();

  const emit = defineEmits<{
    (e: 'resetCode'): string;
  }>();

  const isLoadingPreviousExercise = ref(false);
  const isLoadingNextExercise = ref(false);
</script>

<template>
  <BaseNavbar>
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <NuxtLink :to="props.previousExerciseUrl">
            <Button
              @click="isLoadingPreviousExercise = true"
              :disabled="
                !props.previousExerciseUrl ||
                isLoadingPreviousExercise ||
                isLoadingNextExercise
              "
              variant="outline"
              size="icon"
            >
              <LucideLoaderCircle
                v-if="isLoadingPreviousExercise"
                class="w-4 h-4 animate-spin"
              />
              <LucideChevronLeft v-else class="w-4 h-4" />
            </Button>
          </NuxtLink>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {{
              props.previousExerciseUrl
                ? 'Exercice précédent'
                : 'Aucun exercice précédent'
            }}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>

    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <NuxtLink to="/">
            <Button variant="outline" size="icon">
              <LucideLibrary class="w-4 h-4" />
            </Button>
          </NuxtLink>
        </TooltipTrigger>
        <TooltipContent>
          <p>Changer d'exercice</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>

    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <PlaygroundDialogResetCodeWarning
            @acknowledge-warning="emit('resetCode')"
          >
            <template #trigger>
              <Button variant="outline" size="icon">
                <LucideRotateCcw class="w-4 h-4" />
              </Button>
            </template>
          </PlaygroundDialogResetCodeWarning>
        </TooltipTrigger>
        <TooltipContent>
          <p>Recommencer l'exercice</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>

    <NuxtLink :to="props.nextExerciseUrl">
      <Button
        @click="isLoadingNextExercise = true"
        :disabled="
          !props.nextExerciseUrl ||
          isLoadingPreviousExercise ||
          isLoadingNextExercise
        "
        variant="default"
        size="default"
      >
        <LucideLoaderCircle
          v-if="isLoadingNextExercise"
          class="w-4 h-4 mr-1 animate-spin"
        />
        <LucideChevronRight v-else class="w-4 h-4 mr-1" />
        {{
          props.nextExerciseUrl ? 'Exercice suivant' : 'Aucun exercice suivant'
        }}
      </Button>
    </NuxtLink>
  </BaseNavbar>
</template>

<style></style>
