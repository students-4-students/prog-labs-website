<script lang="ts" setup>
  const studentData = useStudentDataStore();
  const { section } = storeToRefs(studentData);
</script>

<template>
  <BaseNavbar>
    <TooltipProvider>
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
      <template #trigger>
        <Button variant="outline">
          <LucideUsersRound class="w-4 h-4 mr-2" />
          Section
          {{
            section !== undefined ? '“' + section?.name + '”' : 'non définie'
          }}
        </Button>
      </template>
    </OnBoardingSectionDialog>
  </BaseNavbar>
</template>
