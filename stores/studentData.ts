import { defineStore } from 'pinia';

export const useStudentDataStore = defineStore({
  id: 'studentData',
  state: () => ({
    codeLanguage: useLocalStorage('codeLanguage', undefined),
  }),
  actions: {
    setCodeLanguage(codeLanguage: string) {
      this.codeLanguage = codeLanguage.toLowerCase();
    },
  },
});
