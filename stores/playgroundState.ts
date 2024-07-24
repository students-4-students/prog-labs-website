import { defineStore } from 'pinia';

export const usePlaygroundStateStore = defineStore({
  id: 'playgroundState',
  state: () => ({
    exercisePath: useLocalStorage<string | undefined>(
      'playground-exercise-path',
      undefined,
    ),
    writtenCode: useLocalStorage<string | undefined>(
      'playground-written-code',
      undefined,
    ),
  }),
  actions: {
    setCurrentExercisePath(path: string | undefined) {
      this.exercisePath = path;
    },
    setWrittenCode(code: string | undefined) {
      this.writtenCode = code;
    },
  },
});
