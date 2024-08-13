<script lang="ts" setup>
  import type { ParsedContent } from '@nuxt/content';

  const props = defineProps<{
    serieData: Pick<
      ParsedContent,
      '_path' | 'title' | 'description' | 'fallbackLanguage'
    >;
  }>();

  const nuxtApp = useNuxtApp();

  const EXPECTED_EXERCISES_NB = 6;
  const { data: exercises, status: exercisesStatus } = useAsyncData(
    `exercises-${props.serieData.title}`,
    async () => {
      // Load all exercises from the serie
      const allExercises = await queryContent(<string>props.serieData._path)
        .only(['_path', 'title'])
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
    {
      getCachedData(key) {
        return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
      },
    },
  );
</script>

<template>
  <Card class="flex flex-col flex-1">
    <CardHeader class="flex items-start grow">
      <slot name="banner" />
      <CardTitle>
        {{ serieData.title }}
      </CardTitle>
      <CardDescription class="text-justify">
        {{ serieData.description }}
      </CardDescription>
    </CardHeader>
    <CardContent
      v-if="exercises && exercises.length > 0"
      class="grid grid-cols-2 xl:grid-cols-3 gap-1"
    >
      <Skeleton
        class="h-11 dark:bg-background"
        v-if="exercisesStatus === 'pending'"
        v-for="_ in EXPECTED_EXERCISES_NB"
      />
      <!-- Exercises buttons -->
      <Button
        v-for="(exercise, i) in exercises"
        v-else
        variant="secondary"
        size="lg"
        @click="navigateTo(exercise._path)"
      >
        {{ i + 1 }}. {{ exercise.title }}
      </Button>
    </CardContent>
    <CardContent v-else class="flex">
      <!-- Fallback when there's no exercises -->
      <Button variant="secondary" size="lg" class="grow" disabled>
        Aucun exercice disponible pour le moment
      </Button>
    </CardContent>
  </Card>
</template>
