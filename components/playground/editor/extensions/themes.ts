import githubDarkDefaultThemeUrl from '@/assets/vscode-themes/github-dark-default.json?url';
import githubLightDefaultThemeUrl from '@/assets/vscode-themes/github-light-default.json?url';
import { registerExtension, type IExtensionManifest } from 'vscode/extensions';

export const githubLightThemeId = 'Github Light Default';
export const githubDarkThemeId = 'Github Dark Default';

const themeExtension: IExtensionManifest = {
  name: 'github-themes',
  publisher: 's4s',
  version: '1.0.0',
  engines: {
    vscode: '*',
  },
  contributes: {
    themes: [
      {
        id: githubLightThemeId,
        label: githubLightThemeId,
        uiTheme: 'vs',
        path: './colorthemes/github-light-default.json',
      },
      {
        id: githubDarkThemeId,
        label: githubDarkThemeId,
        uiTheme: 'vs-dark',
        path: './colorthemes/github-dark-default.json',
      },
    ],
  },
};

const { whenReady, registerFileUrl } = registerExtension(themeExtension, 1, {
  system: true,
});

registerFileUrl(
  './colorthemes/github-light-default.json',
  githubLightDefaultThemeUrl,
);
registerFileUrl(
  './colorthemes/github-dark-default.json',
  githubDarkDefaultThemeUrl,
);

export { whenReady as whenGithubThemesReady };
