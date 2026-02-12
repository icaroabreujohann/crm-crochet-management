/// <reference types="vite/client" />
/// <reference types="unplugin-vue-router/client" />

export {}

declare global {
  interface Window {
    electronAPI: {
      minimize: () => void
      toggleMaximize: () => void
      close: () => void
    }
  }
}