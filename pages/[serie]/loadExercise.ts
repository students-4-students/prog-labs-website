import type { ParsedContent } from '@nuxt/content';

export type PayloadData =
  | {
      language: AllowedLanguage;
      serie: ParsedContent | null;
      exercise: ParsedContent | null;
    }
  | {
      language: null;
      serie: null;
      exercise: null;
    };

/**
 * Loads the serie and exercise data from the server.
 *
 * @param serieName - The name of the serie
 * @param exerciseName - The name of the exercise
 * @param language - The code language of the exercise
 * @param defaultFallbackLanguage - The default fallback language
 * @returns The exercise and serie data with the final code language used.
 */
export async function loadExerciseData(
  serieName: string,
  exerciseName: string,
  language: AllowedLanguage | undefined,
  defaultFallbackLanguage: AllowedLanguage,
): Promise<PayloadData> {
  // Check if the student has selected a code language
  if (!language) {
    return { serie: null, exercise: null, language: null };
  }

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

/**
 * Loads the previous and next exercises.
 *
 * @param params - The playground data
 * @param params.exercise - The current exercise data
 * @param params.language - The code language of the exercise
 * @returns The surrounding exercises data
 */
export async function loadSurroundingExercises({
  exercise,
  language,
}: PayloadData): Promise<ParsedContent[]> {
  if (exercise && exercise._path) {
    return await queryContent()
      // Don't fetch series and only keep exercises of the same language
      .where({ _dir: { $ne: '' }, _path: { $contains: language } })
      .findSurround(exercise._path)
      .catch((_) => []);
  }
  return [];
}

/**
 * Gets the URL of the exercise.
 *
 * @param path - The path of the exercise.
 * @returns The URL of the exercise.
 */
export function getExerciseUrl(path: string | undefined) {
  // Since the path is relative to the code language,
  // we need to remove the last part because it is
  // automatically added by the playground.
  return path?.slice(0, path.lastIndexOf('/'));
}
