<script lang="ts" setup>
  import CardContent from '../ui/card/CardContent.vue';

  const languages = ref([
    {
      name: 'C++',
      sections: ['MA', 'PH', 'SV', 'MT', 'EL', 'GM'],
    },
    {
      name: 'Java',
      sections: ['IN', 'SC'],
    },
    {
      name: 'Python',
      sections: ['GC', 'MX', 'SIE', 'CMS'],
    },
  ]);
</script>

<template>
  <AlertDialog :default-open="true">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Choix du language de programmation</AlertDialogTitle>
        <AlertDialogDescription>
          Voluptate reprehenderit aute ullamco culpa consectetur laboris
          voluptate ea proident ut. Reprehenderit occaecat dolore qui ad enim
          dolor.
        </AlertDialogDescription>
        <div class="flex flex-col gap-3 my-4">
          <AlertDialogAction
            v-for="{ name, sections } in languages"
            :key="name"
            class="block bg-transparent hover:bg-transparent h-auto p-0 text-left"
          >
            <Card class="hover:bg-slate-50 transition-all">
              <CardHeader>
                <CardTitle class="text-lg">
                  {{ name }}
                </CardTitle>
                <CardDescription>
                  Pour les sections : {{ sections.join(', ') }}
                </CardDescription>
              </CardHeader>
            </Card>
          </AlertDialogAction>
        </div>
      </AlertDialogHeader>
    </AlertDialogContent>
  </AlertDialog>
</template>
