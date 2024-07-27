<script lang="ts" setup>
  const props = defineProps<{
    nextExerciseUrl?: string;
  }>();
</script>

<template>
  <Dialog v-model="$attrs">
    <DialogContent>
      <DialogHeader>
        <NuxtImg
          class="my-4"
          src="/illustrations/exercise-success.png"
          placeholder
        />
        <DialogTitle>Exercice réussi !</DialogTitle>
        <DialogDescription>
          Laboris commodo cillum est laborum nulla do nulla eu velit. Eu ullamco
          nostrud ex adipisicing duis ad cupidatat. Consectetur ex esse occaecat
          pariatur.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button
          :disabled="!props.nextExerciseUrl"
          @click="navigateTo(props.nextExerciseUrl)"
          size="default"
        >
          {{
            props.nextExerciseUrl
              ? 'Prochain exercice'
              : 'Aucun prochain exercice'
          }}
        </Button>
        <Button size="default" variant="outline" @click="navigateTo('/')">
          Changer d'exercice
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<style></style>
