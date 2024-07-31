<script lang="ts" setup>
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
    darkMode?: boolean;
  }>();

  const writtenCode = defineModel<string>({ default: '' });
  const colorMode = useColorMode();
  const currentTheme = computed(() =>
    colorMode.value === 'dark' ? darkTheme.id : lightTheme.id,
  );

  const config = computed<UserConfig>(() => ({
    wrapperConfig: {
      editorAppConfig: {
        $type: 'extended',
        codeResources: {
          main: {
            text: '',
            enforceLanguageId: 'cpp',
            fileExt: 'cpp',
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
</script>

<template>
  <MonacoEditorWrapper
    v-model="writtenCode"
    :config="config"
    class="grow p-4 pl-0"
  />
</template>
