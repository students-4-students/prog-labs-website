<script lang="ts" setup>
  import '@xterm/xterm/css/xterm.css';
  import { Terminal } from '@xterm/xterm';
  import { WebLinksAddon } from '@xterm/addon-web-links';
  import { ClipboardAddon } from '@xterm/addon-clipboard';
  import { FitAddon } from '@xterm/addon-fit';
  import { Unicode11Addon } from '@xterm/addon-unicode11';

  const terminal = new Terminal({
    allowProposedApi: true,
    allowTransparency: true,
    cursorBlink: true,
    theme: {
      // Serendipity Morning theme
      background: 'rgba(255, 255, 255, 0)',
      black: '#F2E9DE',
      red: '#D26A5D',
      green: '#77AAB3',
      yellow: '#C8A299',
      blue: '#3788BE',
      magenta: '#886CDB',
      cyan: '#7397DE',
      white: '#575279',
      brightBlack: '#6E6A86',
      brightRed: '#D26A5D',
      brightGreen: '#77AAB3',
      brightYellow: '#C8A299',
      brightBlue: '#3788BE',
      brightMagenta: '#886CDB',
      brightCyan: '#7397DE',
      brightWhite: '#575279',
      foreground: '#575279',
      selectionBackground: '#F4EFEA',
      cursor: '#9893A5',
    },
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
    terminal.writeln('Hello from \x1B[1;3;31mxterm.js\x1B[0m');
    terminal.write('$ ');
    fitAddon.fit();
  });

  const container = ref();
  // Automatically resize the terminal when the container is resized.
  useResizeObserver(container, (_) => fitAddon.fit());
</script>

<template>
  <div class="flex flex-row w-full">
    <div class="flex gap-2 px-3 py-2 items-center">
      <LucideTerminal class="w-4 h-4" />
      <p class="text-sm font-medium">Code Execution</p>
    </div>
    <div
      class="flex grow justify-start bg-slate-50 border-b border-l border-border"
    >
      <!-- <Button variant="ghost" size="icon" class="rounded-none">
        <LucideChevronDown class="w-4 h-4" />
      </Button> -->
      <Button variant="ghost" size="icon" class="rounded-none">
        <LucideEraser class="w-4 h-4" />
      </Button>
      <Separator orientation="vertical" />
    </div>
  </div>
  <div ref="container" class="w-full h-full p-4">
    <div
      ref="xterm"
      @focus.capture="terminal.focus()"
      @blur.capture="terminal.blur()"
    />
  </div>
</template>
