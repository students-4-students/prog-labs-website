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
      <a class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="/logo.png" class="h-7" alt="S4S Logo" />
      </a>
      <div class="flex items-center md:order-2 space-x-2 rtl:space-x-reverse">
        <Button variant="outline" v-if="!isPlayground">
          <LucideUsersRound class="mr-2 w-4 h-4" />
          Changer de section
        </Button>
        <DropdownMenu v-if="isPlayground">
          <DropdownMenuTrigger as-child>
            <Button variant="outline">
              <LucideBookOpenCheck class="mr-2 w-4 h-4" />
              Changer d'exercice
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent class="w-48">
            <DropdownMenuLabel>Série 1</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <span>Les bases</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <!-- <Button variant="default">
          Prochain Exercice <LucideArrowRight class="ml-2 w-4 h-4" />
        </Button> -->
        <Button variant="default" v-if="isPlayground">
          <LucidePlay class="w-4 h-4 mr-2" />
          Exécuter le code
        </Button>
      </div>
    </div>
  </nav>
</template>
