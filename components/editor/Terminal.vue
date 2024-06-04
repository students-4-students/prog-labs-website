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
      <svg
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
        class="w-3 h-3"
      >
        <path
          d="M1.7629 1.99537C1.55323 1.81566 1.23758 1.83994 1.05787 2.0496C0.878161 2.25927 0.902441 2.57492 1.1121 2.75463L1.7629 1.99537ZM7.37717 7.46615L7.70257 7.08652L7.37717 7.46615ZM7.37717 8.53385L7.70257 8.91348L7.37717 8.53385ZM1.1121 13.2454C0.902441 13.4251 0.878161 13.7407 1.05787 13.9504C1.23758 14.1601 1.55323 14.1843 1.7629 14.0046L1.1121 13.2454ZM8.00011 13.125C7.72397 13.125 7.50011 13.3489 7.50011 13.625C7.50011 13.9011 7.72397 14.125 8.00011 14.125V13.125ZM14.5626 14.125C14.8388 14.125 15.0626 13.9011 15.0626 13.625C15.0626 13.3489 14.8388 13.125 14.5626 13.125V14.125ZM1.1121 2.75463L7.05178 7.84578L7.70257 7.08652L1.7629 1.99537L1.1121 2.75463ZM7.05178 8.15422L1.1121 13.2454L1.7629 14.0046L7.70257 8.91348L7.05178 8.15422ZM7.05178 7.84578C7.14635 7.92684 7.14635 8.07316 7.05178 8.15422L7.70257 8.91348C8.26276 8.43332 8.26276 7.56668 7.70257 7.08652L7.05178 7.84578ZM8.00011 14.125H14.5626V13.125H8.00011V14.125Z"
          fill="currentColor"
        ></path>
      </svg>
      <p class="text-sm font-medium">Code Execution</p>
    </div>
    <div
      class="flex grow justify-start bg-slate-100 border-b-[1.5px] border-l-[1.5px] border-border"
    >
      <button class="p-2">
        <svg
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4"
        >
          <path
            d="M13.8536 5.60356C14.0488 5.40829 14.0488 5.09171 13.8536 4.89645C13.6583 4.70119 13.3417 4.70119 13.1464 4.89645L13.8536 5.60356ZM8.35355 10.3964L8 10.0429V10.0429L8.35355 10.3964ZM7.64644 10.3964L8 10.0429L7.64644 10.3964ZM2.85355 4.89645C2.65829 4.70118 2.34171 4.70118 2.14645 4.89645C1.95118 5.09171 1.95118 5.40829 2.14645 5.60355L2.85355 4.89645ZM13.1464 4.89645L8 10.0429L8.7071 10.75L13.8536 5.60356L13.1464 4.89645ZM8 10.0429L2.85355 4.89645L2.14645 5.60355L7.29289 10.75L8 10.0429ZM8 10.0429V10.0429L7.29289 10.75C7.68341 11.1405 8.31658 11.1405 8.7071 10.75L8 10.0429Z"
            fill="currentColor"
          ></path>
        </svg>
      </button>
      <Separator orientation="vertical" class="border"></Separator>
      <button class="p-2">
        <svg
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4"
        >
          <path
            d="M11.6464 4.64645L5.64645 10.6464L6.35355 11.3536L12.3536 5.35355L11.6464 4.64645Z"
            fill="currentColor"
          ></path>
          <path
            clip-rule="evenodd"
            d="M4.21006 2.94615L1 8L4.21006 13.0538C4.40335 13.3308 4.62771 13.5577 4.88314 13.7346C5.13856 13.9115 5.41815 14 5.72189 14H13.7988C14.1302 14 14.4132 13.8692 14.6479 13.6077C14.8826 13.3462 15 13.0308 15 12.6615V3.33846C15 2.96923 14.8826 2.65385 14.6479 2.39231C14.4132 2.13077 14.1302 2 13.7988 2H5.72189C5.41815 2 5.13511 2.08462 4.87278 2.25385C4.61045 2.42308 4.38955 2.65385 4.21006 2.94615ZM5.16272 12.7308L2.18047 8L5.16272 3.26923C5.20414 3.20769 5.25937 3.15385 5.3284 3.10769C5.39744 3.06154 5.47337 3.03846 5.55621 3.03846H13.7988C13.8678 3.03846 13.9265 3.06923 13.9749 3.13077C14.0232 3.19231 14.0473 3.26154 14.0473 3.33846V12.6615C14.0473 12.7385 14.0232 12.8077 13.9749 12.8692C13.9265 12.9308 13.8678 12.9615 13.7988 12.9615H5.55621C5.47337 12.9615 5.39744 12.9385 5.3284 12.8923C5.25937 12.8462 5.20414 12.7923 5.16272 12.7308Z"
            fill="currentColor"
            fill-rule="evenodd"
          ></path>
        </svg>
      </button>
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
