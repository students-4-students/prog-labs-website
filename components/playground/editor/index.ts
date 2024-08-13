import type { HTMLAttributes } from 'vue';
import { default as Editor } from './EditorOptimized.vue';

export interface EditorProps {
  readOnly?: boolean;
  language: AllowedLanguage;
  darkMode?: boolean;
  class?: HTMLAttributes['class'];
}

export interface EditorEmits {
  (e: 'update:load'): void;
}

export default Editor;
