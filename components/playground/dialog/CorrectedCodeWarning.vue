<script setup lang="ts">
  const props = defineProps<{
    onlyKeepTrigger?: boolean;
  }>();

  const emit = defineEmits<{
    (e: 'acknowledgeWarning'): void;
    (e: 'returnToExercise'): void;
  }>();
</script>

<template>
  <slot v-if="props.onlyKeepTrigger" name="trigger" />
  <Dialog v-bind="$attrs" v-else>
    <DialogTrigger as-child>
      <slot name="trigger" />
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Attention</DialogTitle>
        <DialogDescription>
          Avez-vous déjà passé du temps à chercher la solution par vous-même ?
          Passer du temps à chercher maintenant auprès d'assistants est le plus
          productif pour vous !
        </DialogDescription>
      </DialogHeader>

      <DialogFooter>
        <Button @click="emit('acknowledgeWarning')" size="default">
          Oui, je veux voir la correction
        </Button>
        <DialogClose as-child>
          <Button
            size="default"
            variant="outline"
            @click="emit('returnToExercise')"
          >
            Non, je souhaite continuer à chercher
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
