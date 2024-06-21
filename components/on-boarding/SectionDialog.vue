<script lang="ts" setup>
  const studentData = useStudentDataStore();
  const { sectionCode } = storeToRefs(studentData);

  const isOpen = ref(false);
  watch(
    sectionCode,
    (newValue) => {
      if (newValue === undefined) {
        isOpen.value = newValue === undefined;
      }
    },
    { immediate: true },
  );
</script>

<template>
  <AlertDialog :open="isOpen">
    <AlertDialogTrigger @click="isOpen = true">
      <slot name="trigger" />
    </AlertDialogTrigger>
    <AlertDialogContent @escape-key-down.prevent trap-focus>
      <AlertDialogHeader>
        <NuxtImg
          class="my-[-24px]"
          src="https://www.epfl.ch/about/overview/wp-content/uploads/2020/07/logo-epfl-1024x576.png"
        />
        <AlertDialogTitle class="flex items-center">
          Choix de section
          <LucideSwatchBook class="ml-2 h-5 w-5" />
        </AlertDialogTitle>
        <AlertDialogDescription>
          Voluptate reprehenderit aute ullamco culpa consectetur laboris
          voluptate ea proident ut. Reprehenderit occaecat dolore qui ad enim
          dolor.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <OnBoardingSectionDialogComboBox />
        <AlertDialogAction @click="isOpen = false">
          Choisir
          <LucideArrowRight class="ml-2 h-4 w-4" />
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
