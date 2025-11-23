

import { createResolver } from "@nuxt/kit";
import vuetify from "vite-plugin-vuetify";

const { resolve } = createResolver(import.meta.url);

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  
  ssr: false,
  
  // Configuración para deployment estático
  nitro: {
    prerender: {
      routes: ['/']
    },
    serveStatic: true
  },

  typescript: {
    shim: false,
  },
  
  // Configuración de app para producción
  app: {
    head: {
      title: "AIVision",
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' }
      ]
    },
    baseURL: '/',
    cdnURL: '/'
  },

  // Vuetify build configuration
  build: {
    transpile: ["vuetify"],
  },

  modules: ["@pinia/nuxt"],

  devServerHandlers: [],
  compatibilityDate: '2025-05-15',
});
