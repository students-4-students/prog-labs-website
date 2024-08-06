<script setup lang="ts">
  const props = defineProps<{
    onlyKeepTrigger?: boolean;
  }>();

  const emit = defineEmits<{
    (e: 'acknowledgeWarning'): void;
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
          Laboris commodo cillum est laborum nulla do nulla eu velit. Eu ullamco
          nostrud ex adipisicing duis ad cupidatat. Consectetur ex esse occaecat
          pariatur.
        </DialogDescription>
      </DialogHeader>

      <DialogFooter>
        <Button @click="emit('acknowledgeWarning')" size="default">Oui</Button>
        <Button size="default" variant="outline">
          Non, je souhaite continuer à chercher
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
