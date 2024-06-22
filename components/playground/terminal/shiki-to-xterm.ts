import type { ITheme } from '@xterm/xterm';
import type { BundledLanguage, BundledTheme, HighlighterGeneric } from 'shiki';

/**
 * Converts a TextMate theme to an xterm.js theme.
 * @param themeName The name of the theme.
 */
export function shikiToXterm(
  highlighter: HighlighterGeneric<BundledLanguage, BundledTheme>,
  themeName: BundledTheme,
): ITheme {
  // Get the theme from Shiki
  const theme = highlighter.getTheme(themeName);
  // Theme base
  const xtermTheme: Omit<ITheme, 'extendedAnsi'> = {
    background: theme?.colors?.['editor.background'],
    foreground: theme?.colors?.['editor.foreground'],
    selectionBackground: theme?.colors?.['editor.selectionBackground'],
    cursor: theme?.colors?.['terminalCursor.background'],
    cursorAccent: theme?.colors?.['terminalCursor.foreground'],
  };

  // Extract ANSI colors
  for (const key in theme.colors) {
    if (key.startsWith('terminal.ansi')) {
      // Convert the full key to only the color name
      const extractedKey = key.split('.')[1].slice(4);
      const xtermKey = <keyof typeof xtermTheme>(
        (extractedKey.charAt(0).toLowerCase() + extractedKey.slice(1))
      );
      xtermTheme[xtermKey] = theme.colors[key];
    }
  }
  return xtermTheme;
}
