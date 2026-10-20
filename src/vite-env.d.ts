/// <reference types="vite/client" />

declare module '*.css' {
  const content: CSSStyleSheet;
  export default content;
}

declare module '*.svg' {
  import type { Component } from 'vue';
  const component: Component;
  export default component;
}

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_VERSION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}