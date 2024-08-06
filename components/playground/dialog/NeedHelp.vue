<template>
  <Dialog>
    <DialogTrigger as-child>
      <slot name="trigger" />
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Besoin d'aide ?</DialogTitle>
        <DialogDescription>
          Laboris commodo cillum est laborum nulla do nulla eu velit. Eu ullamco
          nostrud ex adipisicing duis ad cupidatat. Consectetur ex esse occaecat
          pariatur.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button size="default">Lorem Ipsum</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
