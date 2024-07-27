<script lang="ts" setup>
  interface Props {
    isPlayground?: boolean;
    previousExerciseUrl?: string;
    nextExerciseUrl?: string;
  }

  withDefaults(defineProps<Props>(), {
    isPlayground: false,
  });

  const studentData = useStudentDataStore();
  const { section } = storeToRefs(studentData);

  const colorMode = useColorMode();
  const isDarkMode = computed(() => colorMode.value === 'dark');
  function switchColorMode() {
    colorMode.preference = colorMode.preference === 'light' ? 'dark' : 'light';
  }
</script>

<template>
  <nav class="sticky top-0 z-20 border-b bg-background">
    <div class="flex flex-wrap items-center justify-between mx-4 md:mx-8 py-2">
      <a
        class="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer"
        @click="navigateTo('/')"
      >
        <NuxtImg
          src="/logos/s4s-text-dark.webp"
          class="h-7"
          alt="S4S Logo"
          v-if="isDarkMode"
        />
        <NuxtImg
          src="/logos/s4s-text-light.webp"
          class="h-7"
          alt="S4S Logo"
          v-else
        />
      </a>
      <div class="flex items-center md:order-2 space-x-2 rtl:space-x-reverse">
        <OnBoardingSectionDialog>
          <template v-if="!isPlayground" #trigger>
            <Button variant="outline">
              <LucideUsersRound class="w-4 h-4 mr-2" />
              Section
              {{
                section !== undefined
                  ? '"' + section?.name + '"'
                  : 'non définie'
              }}
            </Button>
          </template>
        </OnBoardingSectionDialog>

        <TooltipProvider v-if="isPlayground">
          <Tooltip>
            <TooltipTrigger>
              <Button
                @click="navigateTo(previousExerciseUrl)"
                :disabled="!previousExerciseUrl"
                variant="outline"
                size="icon"
              >
                <LucideChevronLeft class="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {{
                  previousExerciseUrl
                    ? 'Exercice précédent'
                    : 'Aucun exercice précédent'
                }}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider v-if="isPlayground">
          <Tooltip>
            <TooltipTrigger>
              <Button @click="navigateTo('/')" variant="outline" size="icon">
                <LucideLibrary class="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Changer d'exercice</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Button
          v-if="isPlayground"
          @click="navigateTo(nextExerciseUrl)"
          :disabled="!nextExerciseUrl"
          variant="default"
          size="default"
        >
          <LucideChevronRight class="w-4 h-4 mr-1" />
          {{ nextExerciseUrl ? 'Exercice suivant' : 'Aucun exercice suivant' }}
        </Button>

        <Button variant="ghost" size="icon" @click="switchColorMode">
          <LucideSun v-if="isDarkMode" />
          <LucideMoon v-else />
        </Button>
      </div>
    </div>
  </nav>
</template>
