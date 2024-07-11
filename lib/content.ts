import type { QueryBuilderWhere } from '@nuxt/content';
import type { AllowedLanguage } from '~/stores/studentData';

/**
 * Fetches and caches all series following the filter constraints.
 * @param filter - The filter constraints to apply to the query
 * @returns The series that matches the filter
 */
export function queryAllSeries(filter: QueryBuilderWhere) {
  return useAsyncData(`all-series-${JSON.stringify(filter)}`, async () => {
    // Try to fetch the serie from the server
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    return await queryContent()
      // Use _dir: '' to only include series
      // which are at the root of the 'content/' folder
      .where({ _dir: '', ...filter })
      .find();
  });
}

/**
 * Fetches and caches the fallback language of a given serie.
 * @param name  The name of the serie
 * @returns The fallback language of the serie
 */
export function querySerieFallbackLanguage(name: string) {
  return useAsyncData<AllowedLanguage>(
    `${name}-fallback-language`,
    async () => {
      return <AllowedLanguage>(
        (<unknown>await queryContent(name).only(['fallbackLanguage']).findOne())
      );
    },
  );
}
