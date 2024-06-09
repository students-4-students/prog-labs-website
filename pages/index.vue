<template>
  <OnBoardingSectionDialog />
  <div class="flex flex-col space-y-8 px-8 py-6 h-full max-w-[60%]">
    <div class="flex flex-col space-y-5">
      <h2 className="flex items-baseline text-3xl font-bold tracking-tight">
        Exercices
        <LucideBookCopy class="ml-3 w-6 h-6" />
      </h2>
      <div class="flex flex-col">
        <div class="flex flex-row space-x-8">
          <Card class="w-full grow" v-for="nb in 2">
            <CardHeader class="flex items-start">
              <img class="h-14 mb-4" src="/logos/s4s-text-darkpng.png" />
              <CardTitle>Série {{ nb }}</CardTitle>
              <CardDescription>
                Commodo quis eu in consectetur nisi et eu exercitation. Do magna
                voluptate sint reprehenderit pariatur cupidatat Lorem esse
                incididunt. Quis quis sint enim magna aute nisi ad anim.
              </CardDescription>
            </CardHeader>
            <CardContent class="flex flex-wrap gap-2">
              <Button
                class="basis-0 grow"
                variant="secondary"
                size="lg"
                v-for="i in 6"
              >
                Exercice {{ i }}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    <div class="flex flex-col space-y-5">
      <h2 className="flex items-baseline text-3xl font-bold tracking-tight">
        Partenaires
        <LucideHandshake class="ml-3 w-6 h-6" />
      </h2>
      <Card class="w-full grow max-w-[65%]">
        <CardHeader class="flex items-start">
          <img class="h-14 mb-4" src="/logos/polympiads.svg" />
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
            Exercice {{ i }}
          </Button>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
