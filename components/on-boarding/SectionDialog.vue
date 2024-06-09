<script lang="ts" setup>
  const languages = ref([
    {
      name: 'C++',
      sections: [
        'Mathématiques',
        'Physique',
        'Ingénierie des Sciences du Vivant',
        'Microtechnique',
        'Génie Electrique et Electronique',
        'Génie Mécanique',
      ],
    },
    {
      name: 'Java',
      sections: ['Informatique', 'Systèmes de Communication'],
    },
    {
      name: 'Python',
      sections: [
        'Génie Chimique',
        'Science et Génie des Matériaux',
        'Génie Civil',
        "Science et Ingénierie de l'Environnement",
        'Cours de mathématiques spéciales (CMS)',
      ],
    },
  ]);

  const studentData = useStudentDataStore();
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
            @click="studentData.setCodeLanguage(name)"
            class="block bg-transparent hover:bg-transparent h-auto p-0 text-left whitespace-normal"
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
