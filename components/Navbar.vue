<script lang="ts" setup>
  defineProps({
    isPlayground: {
      type: Boolean,
      default: false,
    },
  });
</script>

<template>
  <nav class="sticky top-0 z-20 bg-white border border-gray-200">
    <div class="flex flex-wrap items-center justify-between mx-8 py-3">
      <a
        class="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer"
        @click="navigateTo('/')"
      >
        <img src="/logo.png" class="h-7" alt="S4S Logo" />
      </a>
      <div class="flex items-center md:order-2 space-x-2 rtl:space-x-reverse">
        <OnBoardingSectionDialog>
          <template v-if="!isPlayground" #trigger>
            <Button variant="outline">
              <LucideUsersRound class="mr-2 w-4 h-4" />
              Changer de section
            </Button>
          </template>
        </OnBoardingSectionDialog>
        <Button variant="outline" v-if="isPlayground" @click="navigateTo('/')">
          <LucideBookOpenCheck class="mr-2 w-4 h-4" />
          Changer d'exercice
        </Button>
        <Button variant="default" v-if="isPlayground">
          <LucidePlay class="w-4 h-4 mr-2" />
          Exécuter le code
        </Button>
      </div>
    </div>
  </nav>
</template>
