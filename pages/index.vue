<script lang="ts" setup>
  import type { QueryBuilderWhere } from '@nuxt/content';

  useHead({
    title: 'Exercices',
  });

  const nuxtApp = useNuxtApp();

  const studentData = useStudentDataStore();
  const { codeLanguage } = storeToRefs(studentData);
  // Temporary banner code
  const bannerFileName = computed(() => {
    return `${codeLanguage.value ?? 'python'}`;
  });

  /**
   * Fetches and caches all series following the filter constraints.
   * @param filter - The filter constraints to apply to the query
   * @returns The series that matches the filter
   */
  function queryAllSeries(filter: QueryBuilderWhere) {
    return useAsyncData(
      `all-series-${JSON.stringify(filter)}`,
      async () => {
        // Try to fetch the serie from the server
        // await new Promise((resolve) => setTimeout(resolve, 5000));
        return await queryContent()
          .only(['_path', 'title', 'description', 'fallbackLanguage'])
          // Use _dir: '' to only include series
          // which are at the root of the 'content/' folder
          .where({ _dir: '', ...filter })
          .find();
      },
      {
        getCachedData(key) {
          return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
        },
      },
    );
  }

  const EXPECTED_SERIES_NB = 2;
  const { data: series, status: seriesStatus } = queryAllSeries({
    isPartnerSerie: { $ne: true },
  });

  const EXPECTED_PARTNER_SERIES_NB = 1;
  const { data: partnerSeries, status: partnerSeriesStatus } = queryAllSeries({
    isPartnerSerie: { $eq: true },
  });
</script>

<template>
  <div class="flex flex-col gap-y-6 px-4 md:px-8 py-4">
    <div class="flex flex-col gap-4 lg:gap-6">
      <div class="space-y-1">
        <h2 class="flex items-baseline text-4xl font-bold tracking-normal">
          Exercices disponibles
          <LucideBookCopy class="ml-3 w-6 h-6" />
        </h2>
        <p class="text-xl text-foreground/75 xl:max-w-[70%]">
          Lors du 1<sup>er</sup> TP, concentrez-vous sur la série de syntaxe,
          puis commencez 1 ou 2 algorithmes et terminez les autres lors du 2<sup
            >e</sup
          >
          TP. Pas d'inquiétude si tout n'est pas fini : les séries d'exercices
          de l'EPFL dépassent souvent le temps imparti.
        </p>
      </div>
      <div class="flex flex-col">
        <div class="flex flex-col md:flex-row gap-4 xl:gap-6 flex-wrap">
          <SerieCardSkeleton
            v-if="seriesStatus === 'pending'"
            v-for="_ in EXPECTED_SERIES_NB"
          />
          <SerieCard
            v-for="serie in series"
            v-else
            :serieData="serie"
            class="sm:min-w-[28rem] max-w-[32rem]"
          >
            <template #banner>
              <NuxtImg
                class="w-full aspect-[16/8] -mt-4 mb-4 self-center object-contain"
                :src="`/logos/stylized/${bannerFileName}.png`"
              />
            </template>
          </SerieCard>
        </div>
      </div>
    </div>
    <div class="flex flex-col space-y-4">
      <h2 class="flex items-baseline text-4xl font-bold tracking-normal">
        Partenaires
        <LucideHandshake class="ml-3 w-6 h-6" />
      </h2>
      <SerieCardSkeleton
        v-if="partnerSeriesStatus === 'pending'"
        v-for="_ in EXPECTED_PARTNER_SERIES_NB"
      />
      <SerieCard
        v-else
        v-for="partnerSerie in partnerSeries"
        :serieData="partnerSerie"
        class="max-w-[47rem]"
      >
        <template #banner>
          <NuxtImg class="h-24 mb-4 aspect-auto" src="/logos/polympiads.svg" />
        </template>
      </SerieCard>
    </div>
  </div>
</template>
