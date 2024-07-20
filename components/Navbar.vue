<script lang="ts" setup>
  import { toTitle } from '~/lib/utils';

  defineProps({
    isPlayground: {
      type: Boolean,
      default: false,
    },
    exerciseGroupName: {
      type: String,
      default: 'undefined',
    },
    exerciseName: {
      type: String,
      default: 'undefined',
    },
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
    <div class="grid *:row-start-1 *:col-sta">
      <div
        class="flex flex-wrap items-center justify-between mx-4 md:mx-8 py-2 h-full"
      >
        <a
          class="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer"
          @click="navigateTo('/')"
        >
          <NuxtImg
            src="/logos/s4s-text-dark.png"
            class="h-7"
            alt="S4S Logo"
            v-if="isDarkMode"
          />
          <NuxtImg
            src="/logos/s4s-text-light.png"
            class="h-7"
            alt="S4S Logo"
            v-else
          />
        </a>
        <div
          class="flex items-center md:order-2 space-x-2 rtl:space-x-reverse flex-grow justify-end h-full"
        >
          <OnBoardingSectionDialog>
            <template v-if="!isPlayground" #trigger>
              <Button variant="outline">
                <LucideUsersRound class="mr-2 w-4 h-4" />
                Section
                {{
                  section !== undefined
                    ? '"' + section?.name + '"'
                    : 'non définie'
                }}
              </Button>
            </template>
          </OnBoardingSectionDialog>
          <Button variant="outline" v-if="isPlayground">
            <LucidePlay class="w-4 mr-2" />
            Executer le code
          </Button>
          <Button variant="ghost" size="icon" v-if="isPlayground">
            <LucideRotateCcw class="w-4" />
          </Button>
          <Separator
            orientation="vertical"
            class="h-[80%]"
            v-if="isPlayground"
          />
          <Button
            variant="ghostNoVariation"
            size="icon"
            @click="switchColorMode"
          >
            <LucideSun v-if="isDarkMode" />
            <LucideMoon v-else />
          </Button>
        </div>
      </div>
      <div
        class="flex flex-col items-center flex-grow absolute w-full h-full py-2 pointer-events-none"
        v-if="isPlayground"
      >
        <div class="flex items-center space-x-2 pointer-events-auto">
          <Button variant="ghost" size="icon">
            <LucideArrowLeft class="w-4" />
          </Button>
          <Button variant="outline" @click="navigateTo('/')">
            <LucideBookOpenCheck class="mr-2 w-4 h-4 capitalize" />
            {{ toTitle(exerciseGroupName) }} - {{ toTitle(exerciseName) }}
          </Button>
          <Button size="icon">
            <LucideArrowRight class="w-4" />
          </Button>
        </div>
      </div>
    </div>
  </nav>
</template>
