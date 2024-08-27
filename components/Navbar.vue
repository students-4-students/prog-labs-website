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

  const isLoadingNextExercise = ref(false);
  const isLoadingPreviousExercise = ref(false);

  const colorMode = useColorMode();
  const isDarkMode = computed(() => colorMode.value === 'dark');
  function switchColorMode() {
    colorMode.preference = colorMode.preference === 'light' ? 'dark' : 'light';
  }
</script>

<template>
  <nav class="sticky top-0 z-20 border-b bg-background">
    <div class="flex flex-wrap items-center justify-between mx-4 md:mx-8 py-2">
      <NuxtLink
        class="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer"
        to="/"
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
      </NuxtLink>

      <div class="flex items-center md:order-2 space-x-2 rtl:space-x-reverse">
        <TooltipProvider v-if="!isPlayground">
          <Tooltip>
            <TooltipTrigger>
              <NuxtLink to="/about">
                <Button variant="outline" size="icon">
                  <LucideCircleHelp class="w-4 h-4" />
                </Button>
              </NuxtLink>
            </TooltipTrigger>
            <TooltipContent>
              <p>À propos</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

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
              <NuxtLink :to="previousExerciseUrl">
                <Button
                  @click="isLoadingPreviousExercise = true"
                  :disabled="
                    !previousExerciseUrl ||
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

        <NuxtLink :to="nextExerciseUrl">
          <Button
            v-if="isPlayground"
            @click="isLoadingNextExercise = true"
            :disabled="
              !nextExerciseUrl ||
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
              nextExerciseUrl ? 'Exercice suivant' : 'Aucun exercice suivant'
            }}
          </Button>
        </NuxtLink>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button variant="ghost" size="icon" @click="switchColorMode">
                <LucideSun v-if="isDarkMode" />
                <LucideMoon v-else />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{{ isDarkMode ? 'Mode clair' : 'Mode sombre' }}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  </nav>
</template>
