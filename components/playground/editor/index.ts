import type { HTMLAttributes } from 'vue';
import { default as Editor } from './EditorOptimized.vue';
import type * as monaco from 'monaco-editor';

export interface EditorProps {
  readOnly?: boolean;
  language: AllowedLanguage;
  darkMode?: boolean;
  class?: HTMLAttributes['class'];
  markers: monaco.editor.IMarkerData[];
}

export interface EditorEmits {
  (e: 'update:load'): void;
}

export default Editor;
