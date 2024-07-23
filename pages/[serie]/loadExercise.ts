import type { ParsedContent } from '@nuxt/content';
import type { ModelRef } from 'vue';

export async function loadExerciseData(
  serieName: string,
  exerciseName: string,
  language: AllowedLanguage,
  defaultFallbackLanguage: AllowedLanguage,
) {
  // Fetch the serie from the server
  const serieData = await queryContent(serieName)
    .findOne()
    .catch((_) => null);

  const fallbackLanguage =
    serieData?.fallbackLanguage ?? defaultFallbackLanguage;

  // Fetch the exercise from the server
  let exerciseData = await queryContent(serieName, exerciseName, language)
    .findOne()
    .catch((_) => null);

  if (exerciseData === null && language !== fallbackLanguage) {
    // Try to fetch the exercise in the fallback language
    exerciseData = await queryContent(serieName, exerciseName, fallbackLanguage)
      .findOne()
      .catch((_) => null);

    return {
      language: <AllowedLanguage>fallbackLanguage,
      serie: serieData,
      exercise: exerciseData,
    };
  }

  return {
    language: language,
    serie: serieData,
    exercise: exerciseData,
  };
}

export async function loadExerciseIntoPlayground(
  serieName: string,
  exerciseName: string,
  language: AllowedLanguage | undefined,
  writtenCode: ModelRef<string | undefined, string>,
  correctedCode: ModelRef<string | undefined, string>,
) {
  // Check if the student has selected a language
  if (language === undefined) {
    return {
      language: null,
      serie: null,
      exercise: null,
    };
  }

  const data = await loadExerciseData(
    serieName,
    exerciseName,
    language,
    'python',
  );

  if (data.exercise) {
    // Set the default content for the editors
    writtenCode.value = data.exercise.code?.default ?? '';
    correctedCode.value = data.exercise.code?.corrected;
    // Update the page title and meta tags
    useContentHead(data.exercise);
  }

  return data;
}

export async function loadSurroundingExercises(
  exerciseData: ParsedContent | null,
  language: AllowedLanguage | null,
): Promise<ParsedContent[]> {
  if (exerciseData && exerciseData._path && language) {
    const surroundingExercises = await queryContent()
      // Don't fetch series and only keep exercises of the same language
      .where({ _dir: { $ne: '' }, _path: { $contains: language } })
      .findSurround(exerciseData._path)
      .catch((_) => []);
    return surroundingExercises;
  }
  return [];
}

export function getExerciseUrl(path: string | undefined) {
  return path?.slice(0, path.lastIndexOf('/'));
}
