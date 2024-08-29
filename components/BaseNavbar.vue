<script lang="ts" setup>
  const colorMode = useColorMode();
  const isDarkMode = computed(() => colorMode.value === 'dark');

  const studentData = useStudentDataStore();
  const { disableLanguageServer } = storeToRefs(studentData);

  function switchColorMode() {
    colorMode.preference = isDarkMode.value ? 'dark' : 'light';
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
        <slot />

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button
                @click="
                  () => {
                    studentData.toggleLanguageServer();
                    reloadNuxtApp();
                  }
                "
                variant="ghost"
                size="icon"
              >
                <LucideLightbulb v-if="disableLanguageServer" />
                <LucideLightbulbOff v-else />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {{ disableLanguageServer ? 'Activer' : 'Désactiver' }} la
                suggestion du code
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

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
