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
      injectRegister: "auto",
      workbox: {
        // The SPA navigation fallback must NOT swallow requests for real files
        // that live on the webspace but not in this build (standalone demos,
        // downloads, archived versions). Without this the service worker
        // answers e.g. /demo/paint/index.html with the cached index.html.
        navigateFallbackDenylist: [
          /^\/demo\//,
          /^\/0_dl\//,
          /^\/0_old\//,
          /^\/1_old\//,
          /^\/backup-2025\//,
          // catch-all: a real SPA route never ends in a file extension
          /\.[a-z0-9]+$/i
        ]
      }
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
