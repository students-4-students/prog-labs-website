<script lang="ts" setup>
  import { cn } from '@/lib/utils';

  const isOpen = ref(false);
  const section = defineModel<SectionData | undefined>('section');
</script>

<template>
  <Popover v-model:open="isOpen">
    <PopoverTrigger class="flex gap-3">
      <Button
        variant="outline"
        role="combobox"
        :aria-expanded="isOpen"
        class="justify-between w-80"
      >
        {{ section ? section.name : 'Quelle section intègres-tu ?' }}
        <LucideChevronDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="p-1 w-80" prioritizePosition>
      <Command>
        <CommandInput class="h-9" placeholder="Cherche ta section..." />
        <CommandEmpty>Aucune section n'est disponible.</CommandEmpty>
        <CommandList>
          <CommandGroup
            v-for="codeLanguage in ALLOWED_LANGUAGES"
            :heading="<string>getCodeLanguageData(codeLanguage).name"
          >
            <CommandItem
              class="cursor-pointer"
              v-for="[id, data] in Object.entries(Sections).filter(
                (data) => data[1].codeLanguage === codeLanguage,
              )"
              :key="id"
              :value="data.name"
              @select="
                (ev) => {
                  if (typeof ev.detail.value === 'string') {
                    section = data;
                  }
                  isOpen = false;
                }
              "
            >
              {{ data.name }} ({{ data.code }})
              <LucideCheck
                :class="
                  cn(
                    'ml-auto h-4 w-4',
                    section === data ? 'opacity-100' : 'opacity-0',
                  )
                "
              />
            </CommandItem>
            <!-- Hide the last separator -->
            <CommandSeparator
              class="mt-2"
              v-if="codeLanguage != ALLOWED_LANGUAGES.at(-1)"
            />
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>
