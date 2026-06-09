import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Unified site: documentation + live component reference + gallery, one app,
// one deploy. Consumes the library exactly like any external user — only
// through the public `reacticle` entry, never internal paths.
export default defineConfig({
  root: __dirname,
  plugins: [react()],
  resolve: {
    alias: {
      reacticle: resolve(__dirname, "../../src/index.ts"),
    },
  },
  server: {
    open: true,
  },
  build: {
    outDir: resolve(__dirname, "../../dist/site"),
    emptyOutDir: true,
  },
});
