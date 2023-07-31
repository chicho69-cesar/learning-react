/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BIN_KEY: string
  readonly VITE_API_URL: string
  // More env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
