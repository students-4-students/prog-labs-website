<script lang="ts" setup>
  import '@xterm/xterm/css/xterm.css';
  import { Terminal, type ITheme } from '@xterm/xterm';
  import { WebLinksAddon } from '@xterm/addon-web-links';
  import { ClipboardAddon } from '@xterm/addon-clipboard';
  import { FitAddon } from '@xterm/addon-fit';
  import { Unicode11Addon } from '@xterm/addon-unicode11';
  import {
    type BundledLanguage,
    type BundledTheme,
    type HighlighterGeneric,
  } from 'shiki';

  const props = defineProps<{
    highlighter: HighlighterGeneric<BundledLanguage, BundledTheme>;
  }>();

  const currentTheme = defineModel<BundledTheme>('currentTheme');

  /**
   * Converts a TextMate theme to an xterm.js theme.
   * @param themeName The name of the theme.
   */
  function shikiToXterm(themeName: BundledTheme): ITheme {
    // Get the theme from Shiki
    const theme = props.highlighter.getTheme(themeName);
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
    convertEol: true, // Make \n create a new line
    cursorBlink: true,
    fontFamily: 'Consolas',
  });

  // Change theme dynamically
  watch(
    currentTheme,
    (theme) => {
      if (theme) terminal.options.theme = shikiToXterm(theme);
    },
    { immediate: true },
  );

  const fitAddon = new FitAddon();
  // Load plugins
  terminal.loadAddon(new WebLinksAddon());
  terminal.loadAddon(new ClipboardAddon());
  terminal.loadAddon(fitAddon);
  terminal.loadAddon(new Unicode11Addon());

  const xterm = ref();
  onMounted(() => {
    terminal.open(xterm.value);
    terminal.writeln(`
\u001b[31mException in thread "main" com.example.FakeException: This is a fake exception for demonstration purposes\u001b[0m
    \u001b[36mat \u001b]8;;http://localhost:3000/DummyClass.java:10\u001b\\DummyClass.method(DummyClass.java:10)\u001b]8;;\u001b\\\u001b[36m\u001b[0m
    \u001b[36mat \u001b]8;;http://localhost:3000/Main.java:4\u001b\\Main.main(Main.java:4)\u001b]8;;\u001b\\\u001b[36m\u001b[0m

\u001b[31mCaused by: com.example.AnotherFakeException: Another fake exception occurred\u001b[0m
    \u001b[36mat \u001b]8;;http://localhost:3000/DummyClass.java:15\u001b\\DummyClass.anotherMethod(DummyClass.java:15)\u001b]8;;\u001b\\\u001b[36m\u001b[0m
    \u001b[36mat \u001b]8;;http://localhost:3000/DummyClass.java:8\u001b\\DummyClass.method(DummyClass.java:8)\u001b]8;;\u001b\\\u001b[36m\u001b[0m
    \u001b[36mat \u001b]8;;http://localhost:3000/Main.java:4\u001b\\Main.main(Main.java:4)\u001b]8;;\u001b\\\u001b[36m\u001b[0m
`);
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
