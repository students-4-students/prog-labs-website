<template>
  <Dialog v-model="$attrs">
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
        <Button size="default">Oui</Button>
        <Button size="default" variant="outline">
          Non, je souhaite continuer à chercher
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
