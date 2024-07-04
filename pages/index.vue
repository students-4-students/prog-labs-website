<script lang="ts" setup>
  useHead({
    title: 'Exercices',
  });

  const studentData = useStudentDataStore();
  const { codeLanguage } = storeToRefs(studentData);
  // Temporary banner code
  const bannerFileName = computed(() => {
    return `${codeLanguage.value ?? 'python'}`;
  });

  const EXPECTED_SERIES_NB = 2;
  const { data: series, status: seriesStatus } = useAsyncData(
    'series',
    async () => {
      // await new Promise((resolve) => setTimeout(resolve, 5000));
      // Try to fetch the serie from the server
      return await queryContent()
        .where({
          _dir: '', // Only fetch series
          isPartnerSerie: { $ne: true }, // Exclude partner series
        })
        .find();
    },
  );

  const EXPECTED_PARTNER_SERIES_NB = 1;
  const { data: partnerSeries, status: partnerSeriesStatus } = useAsyncData(
    'partner-series',
    async () => {
      // await new Promise((resolve) => setTimeout(resolve, 5000));
      // Try to fetch the serie from the server
      return await queryContent()
        .where({
          _dir: '', // Only fetch series
          isPartnerSerie: true, // Only partner series
        })
        .find();
    },
  );
</script>

<template>
  <Navbar />
  <div class="flex flex-col gap-y-12 px-4 md:px-8 py-8">
    <div class="flex flex-col gap-5">
      <h2 className="flex items-baseline text-4xl font-bold tracking-tight">
        Exercices
        <LucideBookCopy class="ml-3 w-6 h-6" />
      </h2>
      <div class="flex flex-col">
        <div class="flex flex-col md:flex-row gap-8 flex-wrap">
          <SerieCardSkeleton
            v-if="seriesStatus === 'pending'"
            v-for="_ in EXPECTED_SERIES_NB"
          />
          <SerieCard v-else v-for="serie in series" :serieData="serie">
            <template #banner>
              <NuxtImg
                class="w-full mb-2 self-center"
                :src="`/logos/stylized/${bannerFileName}.png`"
              />
            </template>
          </SerieCard>
        </div>
      </div>
    </div>
    <div class="flex flex-col space-y-5">
      <h2 className="flex items-baseline text-4xl font-bold tracking-tight">
        Partenaires
        <LucideHandshake class="ml-3 w-6 h-6" />
      </h2>
      <SerieCardSkeleton
        v-if="partnerSeriesStatus === 'pending'"
        v-for="_ in EXPECTED_PARTNER_SERIES_NB"
        class="max-w-[760px]"
      />
      <SerieCard
        v-else
        v-for="partnerSerie in partnerSeries"
        :serieData="partnerSerie"
        class="max-w-[760px]"
      >
        <template #banner>
          <NuxtImg class="h-24 mb-4" src="/logos/polympiads.svg" />
        </template>
      </SerieCard>
    </div>
  </div>
</template>
