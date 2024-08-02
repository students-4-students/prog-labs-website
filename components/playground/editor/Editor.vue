<script lang="ts" setup>
  import { PyrightLanguageServer } from './language-servers/python/pyright';
  import { ClangdLanguageServer } from '~/components/playground/editor/language-servers/cpp/clangd';
  import type { UserConfig } from 'monaco-editor-wrapper';
  import '@codingame/monaco-vscode-java-default-extension';
  import getThemeServiceOverride from '@codingame/monaco-vscode-theme-service-override';
  import getTextmateServiceOverride from '@codingame/monaco-vscode-textmate-service-override';
  import {
    themeExtension,
    lightTheme,
    darkTheme,
  } from '~/components/playground/editor/extensions/themes';
  import { WORKSPACE_PATH } from './config/workspace';
  import { Uri } from 'monaco-editor';

  const props = defineProps<{
    readOnly?: boolean;
    language: AllowedLanguage;
    darkMode?: boolean;
  }>();

  const writtenCode = defineModel<string>({ default: '' });
  const colorMode = useColorMode();
  const currentTheme = computed(() =>
    colorMode.value === 'dark' ? darkTheme.id : lightTheme.id,
  );

  const languageData = getCodeLanguageData(props.language);
  const languageServer = await getLanguageServerFor(props.language);

  const config = computed<UserConfig>(() => ({
    languageClientConfig: languageServer?.createMonacoConfig(),
    wrapperConfig: {
      editorAppConfig: {
        $type: 'extended',
        codeResources: {
          main: {
            text: '',
            enforceLanguageId: props.language,
            fileExt: languageData.fileExtension,
          },
        },
        userConfiguration: {
          json: JSON.stringify({
            'workbench.colorTheme': currentTheme.value,
            'editor.bracketPairColorization.enabled': false,
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
          readOnly: props.readOnly,
        },
        extensions: [themeExtension],
      },
      serviceConfig: {
        userServices: {
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
      },
    },
  }));

  function getLanguageServerFor(
    languageId: AllowedLanguage,
  ): Promise<ClangdLanguageServer | PyrightLanguageServer> | null {
    // Don't start a language server if the user cannot modify the code
    if (props.readOnly) return null;

    switch (languageId) {
      case 'cpp': {
        return ClangdLanguageServer.initialize();
      }
      case 'python': {
        return PyrightLanguageServer.initialize();
      }
      default: {
        return null;
      }
    }
  }
</script>

<template>
  <MonacoEditorWrapper
    v-model="writtenCode"
    :config="config"
    class="grow p-4 pl-0"
  />
</template>
