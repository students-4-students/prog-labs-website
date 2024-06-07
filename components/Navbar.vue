<template>
  <nav class="bg-white border border-gray-200">
    <div class="flex flex-wrap items-center justify-between mx-8 py-4">
      <a class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="/logo.png" class="h-7" alt="S4S Logo" />
      </a>
      <div class="flex items-center md:order-2 space-x-2 rtl:space-x-reverse">
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="outline">Changer d'exercice</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent class="w-48">
            <DropdownMenuLabel>Série 1</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User class="mr-2 h-4 w-4" />
                <span>Les bases</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="default">Prochain Exercice</Button>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup></script>

<style></style>
