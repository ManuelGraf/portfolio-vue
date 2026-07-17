import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      // keep the hand-written manifest in public/manifest.json (linked in index.html)
      manifest: false,
      registerType: "autoUpdate",
      injectRegister: "auto"
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // global variables/mixins for every component style block
        // (same behavior as the old vue-cli css.loaderOptions.sass.data)
        additionalData: `@import "@/assets/styles/global.scss";\n`,
        silenceDeprecations: [
          "import",
          "global-builtin",
          "color-functions",
          "slash-div",
          "mixed-decls",
          "legacy-js-api"
        ]
      }
    }
  }
});
