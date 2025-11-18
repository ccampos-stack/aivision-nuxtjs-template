

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
      title: "AIVision Nuxtjs Template",
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/AIVISION/favicon.ico' }
      ]
    },
    baseURL: '/AIVISION/',
    cdnURL: '/AIVISION/'
  },

  // Vuetify build configuration
  build: {
    transpile: ["vuetify"],
  },

  modules: ["@pinia/nuxt"],

  devServerHandlers: [],
  compatibilityDate: '2025-05-15',
});
