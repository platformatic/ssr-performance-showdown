import { defineConfig } from "vite";
import marko from "@marko/vite";

export default defineConfig({
  plugins: [marko()],
  build: {
    emptyOutDir: false, // Avoid server & client deleting files from each other.
    modulePreload: { polyfill: false }
  },
});
