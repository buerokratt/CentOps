/// <reference types="vite/client" />

declare module '*.json' {
  const value: any; // Or a more specific interface if you know the JSON structure
  export default value;
}
