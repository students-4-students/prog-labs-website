<script lang="ts" setup>
  import defu from 'defu';
  import {
    MonacoEditorLanguageClientWrapper,
    type UserConfig,
    type WrapperConfig,
  } from 'monaco-editor-wrapper';
  import { useWorkerFactory } from 'monaco-editor-wrapper/workerFactory';
  import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
  import type { LoggerConfig } from 'monaco-languageclient/tools';
  import getConfigurationServiceOverride from '@codingame/monaco-vscode-configuration-service-override';
  import getEditorServiceOverride from '@codingame/monaco-vscode-editor-service-override';
  import { useOpenEditorStub } from 'monaco-editor-wrapper/vscode/services';

  const props = defineProps<{
    config?: UserConfig;
  }>();

  const writtenCode = defineModel<string>({ default: '' });

  // ------------[ Monaco Editor Wrapper config ]------------
  const wrapperConfig: WrapperConfig = {
    editorAppConfig: {
      $type: 'extended',
      useDiffEditor: false,
      codeResources: {},
    },
    serviceConfig: {
      userServices: {
        ...getConfigurationServiceOverride(),
        ...getEditorServiceOverride(useOpenEditorStub),
      },
      debugLogging: import.meta.dev,
    },
  };
  const loggerConfig: LoggerConfig = {
    enabled: true,
    debugEnabled: import.meta.dev,
  };
  const defaultConfig: UserConfig = {
    wrapperConfig: wrapperConfig,
    languageClientConfig: undefined,
    loggerConfig: loggerConfig,
  };

  // ------------[ Monaco Editor Wrapper Worker ]------------
  useWorkerFactory({
    ignoreMapping: true,
    workerLoaders: {
      editorWorkerService: () => new EditorWorker(),
    },
  });

  // ----------------[ Launch Monaco Editor ]----------------
  const monacoRef = ref<HTMLElement>();
  const userConfig = computed(() => defu(props.config, defaultConfig));
  const wrapper = new MonacoEditorLanguageClientWrapper();

  // Initialize monaco when the html element is available
  watch([monacoRef, userConfig], async ([, newConfig], [, oldConfig]) => {
    if (
      !wrapper.isInitDone() ||
      wrapper.isReInitRequired(newConfig, oldConfig)
    ) {
      if (wrapper.isInitDone()) {
        await wrapper.dispose();
      }
      await wrapper.initAndStart(userConfig.value, monacoRef.value!);
    } else {
      await wrapper.updateCodeResources(
        userConfig.value.wrapperConfig.editorAppConfig.codeResources,
      );
    }

    // Handle model value changes
    const textModels = wrapper.getTextModels();
    if (textModels && textModels.text) {
      const text = textModels.text;

      // Emit v-model changes
      text.onDidChangeContent((_) => {
        writtenCode.value = text.getValue();
      });

      // Synchronize with first v-model value
      text.setValue(writtenCode.value);
      // Apply v-model changes
      watch(writtenCode, (modelValue) => {
        if (text.getValue() !== modelValue) {
          text.setValue(modelValue);
        }
      });
    }
  });

  onUnmounted(() => {
    wrapper.dispose();
  });
</script>

<template>
  <div ref="monacoRef" />
</template>
