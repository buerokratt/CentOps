/// <reference types="vite/client" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production';
  }
}

declare module '*.json' {
  const value: string; // Or a more specific interface if you know the JSON structure
  export default value;
}
