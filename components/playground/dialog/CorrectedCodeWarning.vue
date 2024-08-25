<script setup lang="ts">
  const props = defineProps<{
    onlyKeepTrigger?: boolean;
  }>();

  const emit = defineEmits<{
    (e: 'acknowledgeWarning'): void;
    (e: 'returnToExercise'): void;
  }>();

  const opened = defineModel<boolean>();
  let doNotTriggerCloseEvent = false;
  watch(opened, () => {
    if (!opened.value && !doNotTriggerCloseEvent) {
      emit('returnToExercise');
    }

    doNotTriggerCloseEvent = false;
  });

  function acknowledgeWarning() {
    doNotTriggerCloseEvent = true;
    emit('acknowledgeWarning');
  }
</script>

<template>
  <slot v-if="props.onlyKeepTrigger" name="trigger" />
  <Dialog v-bind="$attrs" v-model:open="opened" v-else>
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

      <DialogFooter class="sm:flex-col gap-2 justify-end">
        <DialogClose as-child>
          <Button size="default">
            Non, je souhaite continuer à chercher
          </Button>
        </DialogClose>
        <Button
          @click="acknowledgeWarning()"
          size="sm"
          variant="outline"
          class="opacity-75 hover:opacity-100 text-xs"
        >
          Oui, je veux voir la correction
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
