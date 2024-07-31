import '@codingame/monaco-vscode-python-default-extension';
import PyrightWorker from '@typefox/pyright-browser/dist/pyright.worker?worker';
import {
  BrowserMessageReader,
  BrowserMessageWriter,
} from 'vscode-languageserver-protocol/browser';
import { LanguageServer } from '..';
import { loadTypeDefinitionFiles } from './loadTypeDefinitions';

export class PyrightLanguageServer extends LanguageServer {
  /**
   * Creates and initializes a pyright language server inside a web worker.
   * @returns the pyright language server.
   */
  static async initialize() {
    const worker = new PyrightWorker();

    // Launch pyright language server
    worker.postMessage({
      type: 'browser/boot',
      mode: 'foreground',
    });

    return new PyrightLanguageServer({
      languageId: 'python',
      worker: worker,
      transports: {
        reader: new BrowserMessageReader(worker),
        writer: new BrowserMessageWriter(worker),
      },
      initializationOptions: {
        files: await loadTypeDefinitionFiles(),
      },
    });
  }
}
