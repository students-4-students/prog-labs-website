<script lang="ts" setup>
  const props = defineProps<{
    nextExerciseUrl?: string;
    language: AllowedLanguage;
    exerciseName: string;
  }>();

  const isLoadingNextExercise = ref(false);
  const comment = ref<string>('');
  const rating = ref(0);

  const { data: userId } = useAsyncData('user-id', async () => {
    const cookie = useCookie('user-id');
    if (!cookie.value) {
      const res = await fetch('/api/get-id');
      cookie.value = (await res.json()).body.id;
    }
    return cookie.value;
  });

  async function submitForm() {
    if (userId.value && (comment.value || rating.value)) {
      await fetch(
        '/api/update?' +
          new URLSearchParams({
            eventName: `end-${props.exerciseName}`,
            userId: userId.value,
            rating: rating.value.toString(),
            reviewContent: comment.value,
            language: props.language,
          }).toString(),
      );
    }
  }
</script>

<template>
  <Dialog modal>
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

      <div class="flex flex-col gap-2" v-if="userId">
        <div class="flex justify-between items-center">
          <Label>Avez-vous apprécié cet exercice ?</Label>
          <Rating v-model="rating" :total-rating="5" />
        </div>
        <Input
          placeholder="Commentaire additionnel (optionnel)"
          v-model="comment"
        />
      </div>

      <DialogFooter>
        <NuxtLink to="/">
          <Button size="default" variant="outline" @click="submitForm">
            Changer d'exercice
          </Button>
        </NuxtLink>
        <NuxtLink :to="props.nextExerciseUrl">
          <Button
            :disabled="!props.nextExerciseUrl || isLoadingNextExercise"
            @click="
              () => {
                submitForm();
                isLoadingNextExercise = true;
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
        </NuxtLink>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
