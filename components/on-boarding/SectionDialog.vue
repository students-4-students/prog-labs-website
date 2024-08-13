<script lang="ts" setup>
  const studentData = useStudentDataStore();
  const selectedSection = ref<SectionData | undefined>(studentData.section);
  const isOpen = ref(studentData.section === undefined);

  watch(selectedSection, (section) => {
    if (section) studentData.setSection(section.code);
  });
</script>

<template>
  <AlertDialog :open="isOpen">
    <AlertDialogTrigger @click="isOpen = true" as-child>
      <slot name="trigger" />
    </AlertDialogTrigger>
    <AlertDialogContent @escape-key-down.prevent trap-focus>
      <AlertDialogHeader>
        <NuxtImg
          src="/logos/epfl.webp"
          class="m-12 aspect-[10/3] object-contain"
        />
        <AlertDialogTitle class="flex items-center">
          Choix de section
          <LucideSwatchBook class="ml-2 h-5 w-5" />
        </AlertDialogTitle>
        <AlertDialogDescription>
          Bienvenue sur le site web de programmation de Students 4 Students !
          Chaque section apprend un langage de programmation différent, veuillez
          choisir celle dans laquelle vous êtes inscrits en BA1 ou CMS.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <OnBoardingSectionDialogComboBox v-model:section="selectedSection" />
        <AlertDialogAction
          @click="isOpen = false"
          :disabled="selectedSection === undefined"
        >
          Choisir
          <LucideArrowRight class="ml-2 h-4 w-4" />
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
