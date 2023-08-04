/// <reference types="vite/client" />

/* En la interface ImportMetaEnv lo que hacemos es definir los tipos que van a
tener nuestras variables de entorno definidas en el archivo .env o el archivo .env.local */
interface ImportMetaEnv {
  readonly VITE_API_BIN_KEY: string
  readonly VITE_API_URL: string
  // More env variables...
}

/* La interface ImportMeta es una interface que nos permite definir el tipo
env con el cual vamos a acceder a las variables de entorno */
interface ImportMeta {
  readonly env: ImportMetaEnv
}
