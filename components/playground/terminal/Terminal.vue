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
  import { type LanguageData } from '~/stores/studentData';
  import { type CompilationResult, godboltBus } from '~/plugins/godbolt';

  const props = defineProps<{
    highlighter: HighlighterGeneric<BundledLanguage, BundledTheme>;
    selectedCode: string;
    languageData: LanguageData;
    selected: string;
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

  const { $compile } = useNuxtApp();

  const runCode = async () => {
    terminal.open(xterm.value);
    terminal.reset();
    if (
      props.languageData.name != null &&
      props.languageData.compilerId != null
    ) {
      try {
        const result: CompilationResult = await $compile(
          props.languageData.name,
          props.languageData.compilerId,
          props.selectedCode.value,
        );
        terminal.writeln(result.stdout.map((o) => o.text).join('\n'));
        terminal.writeln(result.stderr.map((o) => o.text).join('\n'));
      } catch (e) {
        terminal.writeln('Une erreur est arrivée lors de la compilation');
      }
    } else {
      terminal.writeln('Problème de configuration du terminal');
    }
  };

  godboltBus.on('run_code', runCode);

  const container = ref();
  // Automatically resize the terminal when the container is resized.
  useResizeObserver(container, (_) => fitAddon.fit());
</script>

<template>
  <PlaygroundTabsHeader tab-name="Résultat">
    <template #icon>
      <LucideTerminal />
    </template>
    <template #bar>
      <Button
        variant="ghost"
        size="icon"
        class="rounded-none border-r"
        @click="godboltBus.emit('run_code')"
        title="Exécuter le code"
      >
        <LucidePlay class="w-4 h-4" />
      </Button>
      <!-- @TODO Make this button work -->
      <Button
        variant="ghost"
        size="icon"
        class="rounded-none border-r"
        title="Effacer le résultat"
      >
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
