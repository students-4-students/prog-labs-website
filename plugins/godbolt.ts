export type CompilationResult = {
  code: string;
  timedOut: boolean;
  stdout: string[];
  stderr: string[];
  didExecute: boolean;
};

import mitt from 'mitt';
const emitter = mitt();

export default defineNuxtPlugin((nuxtApp) => {
  const baseURL = 'https://godbolt.org/api';
  const timeout = 6000;

  nuxtApp.provide('godbolt_bus', {
    $on: emitter.on,
    $emit: emitter.emit,
  });

  return {
    provide: {
      compile: async (
        language: string,
        compiler: string,
        code: string,
      ): Promise<CompilationResult> => {
        const data = {
          source: code,
          compiler: compiler,
          options: {
            compilerOptions: {
              executorRequest: true,
            },
            filters: {
              execute: true,
            },
            tools: [],
          },
          lang: language,
          allowStoreCodeDebug: true,
        };

        const result = await $fetch(`${baseURL}/compiler/${compiler}/compile`, {
          method: 'post',
          body: data,
          timeout: timeout,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
          },
        });

        return {
          code: result.code,
          timedOut: result.timedOut,
          stdout: result.stdout,
          stderr: result.stderr,
          didExecute: result.didExecute,
        };
      },
    },
  };
});
