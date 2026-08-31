import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const apiOrigin = (env.VITE_API_URL || "").replace(/\/+$/, "");

  return {
    plugins: [
      react(),
      VitePWA({
        registerType: "autoUpdate",
        includeAssets: ["favicon.svg", "icons/apple-touch-icon.png"],
        manifest: {
          name: "Mohammed Meehan & Ariba Muqthar | Wedding Invitation",
          short_name: "M & A Wedding",
          description:
            "With the blessings of Allah, you are cordially invited to our wedding celebration.",
          start_url: "/",
          scope: "/",
          display: "standalone",
          orientation: "portrait",
          background_color: "#f7f2e3",
          theme_color: "#0b2a20",
          lang: "en",
          icons: [
            { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
            { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
            {
              src: "/icons/maskable-512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "maskable"
            }
          ]
        },
        workbox: {
          globPatterns: ["**/*.{js,css,html,svg,png,ico,woff2,wav,mp3,webmanifest}"],
          cleanupOutdatedCaches: true,
          navigateFallback: "/index.html",
          runtimeCaching: [
            {
              urlPattern: /\/images\/.*\.(png|jpe?g|svg|webp)$/,
              handler: "StaleWhileRevalidate",
              options: {
                cacheName: "wedding-images",
                expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 30 }
              }
            },
            {
              urlPattern: ({ url }) => {
                if (!apiOrigin) return false;
                const isApi = apiOrigin.startsWith("/")
                  ? url.pathname.startsWith(apiOrigin)
                  : url.origin === apiOrigin;
                return isApi && /^\/(couple|story|events|venue|theme)\b/.test(url.pathname);
              },
              handler: "NetworkFirst",
              options: {
                networkTimeoutSeconds: 3,
                cacheName: "wedding-api",
                expiration: { maxEntries: 15, maxAgeSeconds: 60 * 60 * 24 }
              }
            }
          ]
        }
      }),
      {
        name: "html-optimizer",
        transformIndexHtml(html) {
          let tags = [
            {
              tag: "link",
              attrs: { rel: "preload", href: "/images/bride.svg", as: "image" }
            },
            {
              tag: "link",
              attrs: { rel: "preload", href: "/images/groom.svg", as: "image" }
            }
          ];
          if (apiOrigin && /^https?:\/\//.test(apiOrigin)) {
            const host = apiOrigin.replace(/^https?:\/\//, "").split("/")[0];
            tags.push(
              { tag: "link", attrs: { rel: "preconnect", href: apiOrigin, crossorigin: "" } },
              { tag: "link", attrs: { rel: "dns-prefetch", href: apiOrigin } },
              { tag: "link", attrs: { rel: "preconnect", href: `https://${host}`, crossorigin: "" } }
            );
          }
          return { html, tags };
        }
      }
    ],
    build: {
      target: "es2018",
      outDir: "dist",
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          manualChunks: {
            react: ["react", "react-dom", "react-router-dom"],
            motion: ["framer-motion", "gsap"]
          }
        }
      }
    },
    server: {
      port: 5173,
      open: true
    }
  };
});
