<script lang="ts" setup>
  import type { ParsedContent } from '@nuxt/content';

  const props = defineProps<{
    serieData: ParsedContent;
  }>();

  const EXPECTED_EXERCISES_NB = 6;
  const { data: exercises, status: exercisesStatus } = useAsyncData(
    `exercises-${props.serieData.title}`,
    async () => {
      // Load all exercises from the serie
      const allExercises = await queryContent(<string>props.serieData._path)
        .where({
          _dir: { $ne: '' }, // Only fetch exercises
        })
        .find();

      // await new Promise((resolve) => setTimeout(resolve, 5000));
      // Dedupe exercises which are in multiple code languages
      return allExercises
        .filter((exercise) =>
          exercise._path?.includes(props.serieData.fallbackLanguage),
        )
        .map((exercise) => ({
          ...exercise,
          // Remove the language from the path
          _path: exercise._path?.substring(0, exercise._path?.lastIndexOf('/')),
        }));
    },
  );
</script>

<template>
  <Card class="flex flex-col w-full grow max-w-[520px]">
    <CardHeader class="flex items-start grow">
      <slot name="banner" />
      <CardTitle>
        {{ serieData.title }}
      </CardTitle>
      <CardDescription>
        {{ serieData.description }}
      </CardDescription>
    </CardHeader>
    <CardContent class="flex flex-1 basis-0 flex-wrap gap-2">
      <Skeleton
        class="h-11 w-36 grow dark:bg-background"
        v-if="exercisesStatus === 'pending'"
        v-for="_ in EXPECTED_EXERCISES_NB"
      />
      <!-- Fallback when there's no exercises -->
      <Button
        v-else-if="exercises && exercises.length === 0"
        variant="secondary"
        size="lg"
        class="grow"
        disabled
      >
        Aucun exercice disponible pour le moment
      </Button>
      <!-- Exercises buttons -->
      <Button
        v-else
        variant="secondary"
        size="lg"
        class="grow"
        v-for="(exercise, i) in exercises"
        @click="navigateTo(exercise._path)"
      >
        Exercice n°{{ i + 1 }}
      </Button>
    </CardContent>
  </Card>
</template>

<style></style>
