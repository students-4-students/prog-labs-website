import githubDarkDefaultTheme from '@/assets/vscode-themes/github-dark-default.json?raw';
import githubLightDefaultTheme from '@/assets/vscode-themes/github-light-default.json?raw';
import type { ExtensionConfig } from 'monaco-editor-wrapper';

export const lightTheme = {
  id: 'Github Light Default',
  label: 'Github Light Default',
  uiTheme: 'vs',
  path: './colorthemes/github-light-default.json',
};

export const darkTheme = {
  id: 'Github Dark Default',
  label: 'Github Dark Default',
  uiTheme: 'vs-dark',
  path: './colorthemes/github-dark-default.json',
};

export const themeExtension: ExtensionConfig = {
  config: {
    name: 'github-themes',
    publisher: 's4s',
    version: '1.0.0',
    engines: {
      vscode: '*',
    },
    contributes: {
      themes: [lightTheme, darkTheme],
    },
  },
  filesOrContents: new Map<string, string | URL>([
    ['./colorthemes/github-dark-default.json', githubDarkDefaultTheme],
    ['./colorthemes/github-light-default.json', githubLightDefaultTheme],
  ]),
};
