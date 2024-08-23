<script lang="ts" setup>
  const props = defineProps<{
    nextExerciseUrl?: string;
  }>();

  const isLoadingNextExercise = ref(false);
</script>

<template>
  <Dialog>
    <DialogContent>
      <DialogHeader>
        <NuxtImg
          class="my-4 aspect-[31/20] object-contain"
          src="/illustrations/exercise-success.webp"
          preload
        />
        <DialogTitle>Exercice réussi !</DialogTitle>
        <DialogDescription>
          Bravo ! Votre code fonctionne exactement comme demandé.
        </DialogDescription>
      </DialogHeader>

      <DialogFooter>
        <NuxtLink to="/">
          <Button size="default" variant="outline"> Changer d'exercice </Button>
        </NuxtLink>
        <NuxtLink :to="props.nextExerciseUrl">
          <Button
            :disabled="!props.nextExerciseUrl || isLoadingNextExercise"
            @click="isLoadingNextExercise = true"
            size="default"
          >
            <LucideLoaderCircle
              v-if="isLoadingNextExercise"
              class="w-4 h-4 mr-1 animate-spin"
            />
            {{
              props.nextExerciseUrl
                ? 'Prochain exercice'
                : 'Aucun prochain exercice'
            }}
          </Button>
        </NuxtLink>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
