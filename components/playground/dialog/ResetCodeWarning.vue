<script setup lang="ts">
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
    opened.value = false;

    emit('acknowledgeWarning');
  }
</script>

<template>
  <Dialog v-bind="$attrs" v-model:open="opened">
    <DialogTrigger as-child>
      <slot name="trigger" />
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Attention</DialogTitle>
        <DialogDescription>
          Toute votre progression sur cet exercice sera perdue. Voulez vous
          vraiment recommencez depuis le début ?
        </DialogDescription>
      </DialogHeader>

      <DialogFooter>
        <Button
          @click="acknowledgeWarning()"
          variant="destructive"
          class="grow"
        >
          <LucideTriangleAlert class="h-4" />
          Oui
        </Button>
        <DialogClose as-child>
          <Button class="grow" variant="outline"> Non </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
