<script lang="ts" setup>
  useHead({
    title: 'Exercices',
  });

  const studentData = useStudentDataStore();
  const { codeLanguage } = storeToRefs(studentData);

  const bannerFileName = computed(() => {
    return `${codeLanguage.value ?? 'python'}`;
  });
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
          <Card class="w-full grow max-w-[520px]" v-for="nb in 3">
            <CardHeader class="flex items-start">
              <NuxtImg
                class="w-full -my-2 self-center"
                :src="`/logos/stylized/${bannerFileName}.png`"
                alt=""
              />
              <CardTitle>Série {{ nb }} : Lorem Ipsum</CardTitle>
              <CardDescription>
                Commodo quis eu in consectetur nisi et eu exercitation. Do magna
                voluptate sint reprehenderit pariatur cupidatat Lorem esse
                incididunt. Quis quis sint enim magna aute nisi ad anim.
              </CardDescription>
            </CardHeader>
            <CardContent class="flex flex-1 basis-0 flex-wrap gap-2">
              <Button variant="secondary" size="lg" class="grow" v-for="i in 6">
                Exercice n°{{ i }}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    <div class="flex flex-col space-y-5">
      <h2 className="flex items-baseline text-4xl font-bold tracking-tight">
        Partenaires
        <LucideHandshake class="ml-3 w-6 h-6" />
      </h2>
      <Card class="w-full grow max-w-[760px]">
        <CardHeader class="flex items-start">
          <NuxtImg class="h-28 mb-4" src="/logos/polympiads.svg" />
          <CardTitle class="flex">Série Polympiads</CardTitle>
          <CardDescription>
            Commodo quis eu in consectetur nisi et eu exercitation. Do magna
            voluptate sint reprehenderit pariatur cupidatat Lorem esse
            incididunt. Quis quis sint enim magna aute nisi ad anim. Non
            deserunt anim adipisicing sint sit.
          </CardDescription>
        </CardHeader>
        <CardContent class="flex flex-wrap gap-2">
          <Button variant="secondary" size="lg" v-for="i in 3">
            Exercice n°{{ i }}
          </Button>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
