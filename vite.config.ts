import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import customPlugins from "./vite/plugins";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), ...customPlugins],
  base: "https://devklick.github.io/alarm-clock/",
  resolve: {
    alias: {
      // See https://github.com/tabler/tabler-icons/issues/1233#issuecomment-2428245119
      // /esm/icons/index.mjs only exports the icons statically, so no separate chunks are created
      "@tabler/icons-react": "@tabler/icons-react/dist/esm/icons/index.mjs",
    },
  },
});
