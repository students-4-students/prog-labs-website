/// <reference lib="WebWorker" />
/**
 * @author Mw3y
 * @author Guyutongxue
 * @link https://github.com/Guyutongxue/clangd-in-browser
 */
import {
  BrowserMessageReader,
  BrowserMessageWriter,
} from 'vscode-languageserver-protocol/browser';
import { JsonStream, LF } from './JsonStream';
import { WORKSPACE_PATH } from '../../workspace';

declare const self: DedicatedWorkerGlobalScope;

const SHOW_LOGS = import.meta.env.DEV;
const COMPILE_ARGS = ['-xc++', '-std=c++2b', '-pedantic-errors', '-Wall'];
const FLAGS = [
  ...COMPILE_ARGS,
  '--target=wasm32-wasi',
  '-isystem/usr/include/c++/v1',
  '-isystem/usr/include/wasm32-wasi/c++/v1',
  '-isystem/usr/include',
  '-isystem/usr/include/wasm32-wasi',
];

const reader = new BrowserMessageReader(self);
const writer = new BrowserMessageWriter(self);

const stdinChunks: string[] = [];
const currentStdinChunk: (number | null)[] = [];
const textEncoder = new TextEncoder();
let resolveStdinReady = () => {};

function stdin(): number | null {
  if (currentStdinChunk.length === 0) {
    if (stdinChunks.length === 0) {
      // Should not reach here
      // stdinChunks.push("Content-Length: 0\r\n", "\r\n");
      console.error('Try to fetch exhausted stdin');
      return null;
    }
    const nextChunk = stdinChunks.shift()!;
    currentStdinChunk.push(...textEncoder.encode(nextChunk), null);
  }
  return currentStdinChunk.shift()!;
}

const jsonStream = new JsonStream();
function stdout(charCode: number) {
  const jsonOrNull = jsonStream.insert(charCode);
  if (jsonOrNull !== null) {
    if (SHOW_LOGS) {
      console.log('%c%s', 'color: green', jsonOrNull);
    }
    writer.write(JSON.parse(jsonOrNull));
  }
}

let stderrLine = '';
function stderr(charCode: number) {
  if (charCode === LF) {
    if (SHOW_LOGS) {
      console.log('%c%s', 'color: darkorange', stderrLine);
    }
    stderrLine = '';
  } else {
    stderrLine += String.fromCharCode(charCode);
  }
}

async function stdinReady() {
  if (stdinChunks.length === 0)
    return new Promise<void>((r) => {
      resolveStdinReady = r;
    });
}

function onAbort() {
  writer.end();
  self.reportError('clangd aborted');
}

const wasmBase = '/cpp/';
const wasmDataUrl = `${wasmBase}clangd.wasm`;

const { default: Clangd } = await import(
  /* @vite-ignore */ `${wasmBase}clangd.js`
);

const clangd = await Clangd({
  thisProgram: '/usr/bin/clangd',
  locateFile: (path: string, prefix: string) => {
    return path.endsWith('.wasm') ? wasmDataUrl : `${prefix}${path}`;
  },
  stdinReady,
  stdin,
  stdout,
  stderr,
  onExit: onAbort,
  onAbort,
});

// Create the Emscripten workspace
clangd.FS.mkdir(WORKSPACE_PATH);
clangd.FS.writeFile(
  `${WORKSPACE_PATH}/.clangd`,
  JSON.stringify({ CompileFlags: { Add: FLAGS } }),
);

console.log('%c%s', 'font-size: 2em; color: green', 'clangd started');
clangd.callMain([]);

// Notify main thread that the worker is ready
self.postMessage({ type: 'ready' });

reader.listen((data) => {
  // Non-ASCII characters cause bad Content-Length. Just escape them.
  const body = JSON.stringify(data).replace(/[\u007F-\uFFFF]/g, (ch) => {
    return `\\u${ch.codePointAt(0)!.toString(16).padStart(4, '0')}`;
  });
  const header = `Content-Length: ${body.length}\r\n`;
  const delimiter = '\r\n';
  stdinChunks.push(header, delimiter, body);
  resolveStdinReady();
});
