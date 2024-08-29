<script lang="ts" setup>
  import '@codingame/monaco-vscode-language-pack-fr';
  import '@codingame/monaco-vscode-java-default-extension';
  import getConfigurationServiceOverride from '@codingame/monaco-vscode-configuration-service-override';
  import getEditorServiceOverride from '@codingame/monaco-vscode-editor-service-override';
  import getTextmateServiceOverride from '@codingame/monaco-vscode-textmate-service-override';
  import getThemeServiceOverride from '@codingame/monaco-vscode-theme-service-override';
  import { editor, Uri } from 'monaco-editor';
  import {
    MonacoEditorLanguageClientWrapper,
    type UserConfig,
    type WrapperConfig,
  } from 'monaco-editor-wrapper';
  import { useOpenEditorStub } from 'monaco-editor-wrapper/vscode/services';
  import { useWorkerFactory } from 'monaco-editor-wrapper/workerFactory';
  import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
  import type { LoggerConfig } from 'monaco-languageclient/tools';
  import { WORKSPACE_PATH } from './config/workspace';
  import type { ClangdLanguageServer } from './language-servers/cpp/clangd';
  import type { PyrightLanguageServer } from './language-servers/python/pyright';
  import { cn } from '@/lib/utils';
  import {
    whenGithubThemesReady,
    githubLightThemeId,
    githubDarkThemeId,
  } from './extensions/themes';
  import type { EditorEmits, EditorProps } from '.';

  const props = withDefaults(defineProps<EditorProps>(), {
    markers: () => [],
  });
  const emit = defineEmits<EditorEmits>();

  const colorMode = useColorMode();
  const writtenCode = defineModel<string>();

  // ------------------[ Language server ]-------------------
  const languageData = getCodeLanguageData(props.language);
  const languageServer = await getLanguageServerFor(props.language).catch(
    () => null,
  );

  // ------------[ Monaco Editor Wrapper config ]------------
  const wrapperConfig = computed<WrapperConfig>(() => ({
    editorAppConfig: {
      $type: 'extended',
      useDiffEditor: false,
      awaitExtensionReadiness: [whenGithubThemesReady],
      codeResources: {
        main: {
          text: '',
          enforceLanguageId: props.language,
          fileExt: languageData.fileExtension,
        },
      },
      userConfiguration: {
        json: JSON.stringify({
          'editor.autoClosingBrackets': 'always',
          'editor.bracketPairColorization.enabled': false,
          'editor.stickyScroll.enabled': false,
        }),
      },
      editorOptions: {
        lineNumbersMinChars: 2,
        fontSize: 16,
        fontFamily: 'JetBrains Mono',
        fontWeight: '400',
        minimap: {
          enabled: false,
        },
        padding: {
          top: 16,
          bottom: 16,
        },
        readOnly: props.readOnly,
        fixedOverflowWidgets: true,
      },
    },
    serviceConfig: {
      userServices: {
        ...getConfigurationServiceOverride(),
        ...getEditorServiceOverride(useOpenEditorStub),
        ...getThemeServiceOverride(),
        ...getTextmateServiceOverride(),
      },
      workspaceConfig: {
        workspaceProvider: {
          trusted: true,
          workspace: {
            workspaceUri: Uri.file(WORKSPACE_PATH),
          },
          async open() {
            return false;
          },
        },
      },
      debugLogging: import.meta.dev,
    },
  }));
  const loggerConfig: LoggerConfig = {
    enabled: true,
    debugEnabled: import.meta.dev,
  };
  const userConfig = computed<UserConfig>(() => ({
    wrapperConfig: wrapperConfig.value,
    languageClientConfig: languageServer?.createMonacoConfig(),
    loggerConfig: loggerConfig,
  }));

  // ------------[ Monaco Editor Wrapper Worker ]------------
  useWorkerFactory({
    ignoreMapping: true,
    workerLoaders: {
      editorWorkerService: () => new EditorWorker(),
    },
  });

  // ----------------[ Launch Monaco Editor ]----------------
  const monacoRef = ref<HTMLElement>();
  const wrapper = new MonacoEditorLanguageClientWrapper();

  onMounted(async () => {
    await wrapper.initAndStart(userConfig.value, monacoRef.value!);

    emit('update:load');

    // Initialize monaco when the html element is available
    watch(userConfig, async (newConfig, oldConfig) => {
      if (
        wrapper.isStarted() &&
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
    });

    // Handle model value changes
    const textModels = wrapper.getTextModels();
    if (textModels && textModels.text) {
      const text = textModels.text;

      // Emit v-model changes
      text.onDidChangeContent((_) => {
        writtenCode.value = text.getValue();
      });

      // Synchronize with first v-model value
      writtenCode.value && text.setValue(writtenCode.value);
      // Apply v-model changes
      watch(writtenCode, (modelValue) => {
        if (modelValue && text.getValue() !== modelValue) {
          text.setValue(modelValue);
        }
      });
    }

    // Synchronize theme with the color mode
    watch(
      colorMode,
      () => {
        const theme =
          colorMode.value === 'dark' ? githubDarkThemeId : githubLightThemeId;
        editor.setTheme(theme);
      },
      { immediate: true },
    );

    // Add markers (errors…)
    watch(props.markers, () => {
      const textModels = wrapper.getTextModels();
      if (textModels && textModels.text) {
        editor.setModelMarkers(textModels.text, 'EditorWrapper', props.markers);
      }
    });
  });

  onUnmounted(() => {
    wrapper.dispose();
  });

  async function getLanguageServerFor(
    languageId: AllowedLanguage,
  ): Promise<ClangdLanguageServer | PyrightLanguageServer | null> {
    let languageServer = null;
    switch (languageId) {
      case 'cpp': {
        languageServer = (await import('./language-servers/cpp/clangd.js'))
          .ClangdLanguageServer;
        break;
      }
      case 'python': {
        languageServer = (await import('./language-servers/python/pyright.js'))
          .PyrightLanguageServer;
        break;
      }
    }

    // Don't start a language server if the user cannot modify the code
    return !languageServer || props.readOnly || props.disableLanguageServer
      ? null
      : languageServer.initialize();
  }
</script>

<template>
  <div ref="monacoRef" :class="cn('grow', props.class)" />
</template>

<style lang="css">
  .monaco-editor {
    --vscode-editorGutter-background: hsl(var(--background));
    --vscode-editor-background: hsl(var(--background));
    --vscode-editorLineNumber-foreground: hsl(var(--foreground) / 0.3);
    --vscode-editorLineNumber-activeForeground: hsl(var(--foreground));
  }
</style>
