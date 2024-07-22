<script lang="ts" setup>
  import '@xterm/xterm/css/xterm.css';
  import { Terminal } from '@xterm/xterm';
  import { WebLinksAddon } from '@xterm/addon-web-links';
  import { ClipboardAddon } from '@xterm/addon-clipboard';
  import { FitAddon } from '@xterm/addon-fit';
  import { Unicode11Addon } from '@xterm/addon-unicode11';
  import {
    type BundledLanguage,
    type BundledTheme,
    type HighlighterGeneric,
  } from 'shiki';
  import { shikiToXterm } from './shiki-to-xterm';

  const props = defineProps<{
    highlighter: HighlighterGeneric<BundledLanguage, BundledTheme>;
  }>();

  const currentTheme = defineModel<BundledTheme>('currentTheme');
  const terminal = new Terminal({
    allowProposedApi: true,
    allowTransparency: true,
    convertEol: true, // Make \n create a new line
    cursorBlink: true,
    fontFamily: 'JetBrains Mono, monospace',
  });

  // Change theme dynamically
  watch(
    currentTheme,
    (theme) => {
      if (theme)
        terminal.options.theme = shikiToXterm(props.highlighter, theme);
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
  <PlaygroundTabsHeader>
    <template #icon>
      <LucideTerminal />
    </template>
    Résultat du code
    <template #bar>
      <Button variant="default" size="xs" class="m-1 ml-2">
        <LucidePlay class="w-4 h-4 mr-1" />
        Exécuter
      </Button>
    </template>
  </PlaygroundTabsHeader>
  <ScrollArea ref="container" class="w-full h-full p-4">
    <div
      ref="xterm"
      @focus.capture="terminal.focus()"
      @blur.capture="terminal.blur()"
    />
  </ScrollArea>
</template>

<style lang="scss">
  // Hide the scrollbar from xterm
  .xterm-viewport {
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    scrollbar-width: none; /* Firefox */
  }
  .xterm-viewport::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
</style>
