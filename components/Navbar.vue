<script lang="ts" setup>
  defineProps({
    isPlayground: {
      type: Boolean,
      default: false,
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
    <div class="flex flex-wrap items-center justify-between mx-4 md:mx-8 py-2">
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
      <div class="flex items-center md:order-2 space-x-2 rtl:space-x-reverse">
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
        <Button variant="outline" v-if="isPlayground" @click="navigateTo('/')">
          <LucideBookOpenCheck class="mr-2 w-4 h-4" />
          Changer d'exercice
        </Button>
        <Button v-if="isPlayground">
          <LucidePlay class="w-4 h-4 mr-2" />
          Prochain exercice
        </Button>
        <Button variant="ghost" size="icon" @click="switchColorMode">
          <LucideSun v-if="isDarkMode" />
          <LucideMoon v-else />
        </Button>
      </div>
    </div>
  </nav>
</template>
