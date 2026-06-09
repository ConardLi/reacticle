import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";
// Builds a self-contained single-page HTML artifact (CSS + JS inlined, opens
// offline) from the sample report. Output: dist-report/report.html.
export default defineConfig({
    root: __dirname,
    plugins: [react(), viteSingleFile()],
    resolve: {
        alias: {
            reacticle: resolve(__dirname, "../../src/index.ts"),
        },
    },
    build: {
        outDir: resolve(__dirname, "../../dist-report"),
        emptyOutDir: true,
        rollupOptions: {
            input: resolve(__dirname, "report.html"),
        },
    },
});
