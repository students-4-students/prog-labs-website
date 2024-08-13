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
        <Button size="default" variant="outline" @click="navigateTo('/')">
          Changer d'exercice
        </Button>
        <Button
          :disabled="!props.nextExerciseUrl || isLoadingNextExercise"
          @click="
            () => {
              isLoadingNextExercise = true;
              navigateTo(props.nextExerciseUrl);
            }
          "
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
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
