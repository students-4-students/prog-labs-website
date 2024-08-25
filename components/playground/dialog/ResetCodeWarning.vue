<script setup lang="ts">
  const emit = defineEmits<{
    (e: 'acknowledgeWarning'): void;
    (e: 'returnToExercise'): void;
  }>();

  let opened = defineModel<boolean>();
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
          Voulez vous vraiment recommencez depuis le début ?
        </DialogDescription>
      </DialogHeader>

      <DialogFooter class="flex">
        <Button
          @click="acknowledgeWarning()"
          variant="destructive"
          size="default"
          class="flex-grow"
        >
          Oui
        </Button>
        <DialogClose as-child>
          <Button size="default" class="flex-grow"> Non </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
