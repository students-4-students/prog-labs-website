<script lang="ts" setup>
  import '@xterm/xterm/css/xterm.css';
  import { Terminal, type ITheme } from '@xterm/xterm';
  import { WebLinksAddon } from '@xterm/addon-web-links';
  import { ClipboardAddon } from '@xterm/addon-clipboard';
  import { FitAddon } from '@xterm/addon-fit';
  import { Unicode11Addon } from '@xterm/addon-unicode11';
  import { getHighlighter, type BundledTheme } from 'shiki';

  const props = defineProps<{
    theme: BundledTheme;
  }>();

  const highlighter = await getHighlighter({
    themes: [props.theme],
    langs: [],
  });

  /**
   * Converts a TextMate theme to an xterm.js theme.
   * @param themeName The name of the theme.
   */
  function textmateThemeToXtermTheme(themeName: BundledTheme): ITheme {
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

  const terminal = new Terminal({
    allowProposedApi: true,
    allowTransparency: true,
    cursorBlink: true,
    theme: textmateThemeToXtermTheme(props.theme),
    fontFamily: 'Consolas',
  });

  const fitAddon = new FitAddon();
  // Load plugins
  terminal.loadAddon(new WebLinksAddon());
  terminal.loadAddon(new ClipboardAddon());
  terminal.loadAddon(fitAddon);
  terminal.loadAddon(new Unicode11Addon());

  const xterm = ref();
  onMounted(() => {
    terminal.open(xterm.value);
    terminal.write('$ ');
    fitAddon.fit();
  });

  const container = ref();
  // Automatically resize the terminal when the container is resized.
  useResizeObserver(container, (_) => fitAddon.fit());
</script>

<template>
  <PlaygroundTabsHeader tab-name="Terminal">
    <template #icon>
      <LucideTerminal />
    </template>
    <template #bar>
      <Button variant="ghost" size="icon" class="rounded-none border-r">
        <LucidePlay class="w-4 h-4" />
      </Button>
      <Button variant="ghost" size="icon" class="rounded-none border-r">
        <LucideEraser class="w-4 h-4" />
      </Button>
    </template>
  </PlaygroundTabsHeader>
  <div ref="container" class="w-full h-full p-4">
    <div
      ref="xterm"
      @focus.capture="terminal.focus()"
      @blur.capture="terminal.blur()"
    />
  </div>
</template>
