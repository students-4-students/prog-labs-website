import '@codingame/monaco-vscode-cpp-default-extension';
import { LanguageServer } from '..';
import ClangdWorker from './worker?worker';
import {
  BrowserMessageReader,
  BrowserMessageWriter,
} from 'vscode-languageserver-protocol/browser';

export class ClangdLanguageServer extends LanguageServer {
  /**
   * Creates and initializes a clangd language server inside a web worker.
   * @returns the clangd language server.
   */
  static async initialize() {
    const worker = new ClangdWorker();
    await LanguageServer.awaitWorkerLoad(worker);

    return new ClangdLanguageServer({
      languageId: 'cpp',
      worker: worker,
      transports: {
        reader: new BrowserMessageReader(worker),
        writer: new BrowserMessageWriter(worker),
      },
    });
  }
}
