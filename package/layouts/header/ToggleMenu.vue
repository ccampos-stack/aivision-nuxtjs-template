<script setup lang="ts">
import { Icon } from "@iconify/vue";

// Usar rutas dinámicas para SVGs
const { $config } = useNuxtApp()
const baseURL = $config?.app?.baseURL || '/'

const AnimatedIcon = `${baseURL}images/svgs/dark-astrisk.svg`
const AnimatedIconPrimary = `${baseURL}images/svgs/primary-astrisk.svg`

const menuOpen = ref(false); // Controls the v-menu open state
interface Item {
  title: string;
  url: string;
}

const items: Item[] = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Nosotros",
    url: "/about",
  },
  {
    title: "Proyectos",
    url: "/projects",
  },
  {
    title: "Blog",
    url: "/blog",
  },
  {
    title: "Contacto",
    url: "/contact",
  },

];
</script>

<template>
  <v-menu v-model="menuOpen" :close-on-content-click="false">
    <template v-slot:activator="{ props }">
      <v-btn
        class="custom-hover-primary"
        rounded="pill"
        variant="text"
        v-bind="props"
        icon
      >
        <v-avatar size="50" color="white">
          <Icon icon="tabler:menu" height="30" />
        </v-avatar>
      </v-btn>
    </template>
    <v-sheet rounded="lg" width="380" elevation="10" class="pa-6 mt-n12 bg-accent">
      <div class="d-flex align-center justify-space-between border-b pb-4 ">
        <p class="text-subtitle-1 text-dark">Menu</p>
        <v-btn
          size="35"
          color="dark"
          icon
          variant="text"
          @click="menuOpen = false"
          ><Icon icon="tabler:x" height="26"
        /></v-btn>
      </div>
      <ul class="menu-list d-flex flex-column ga-2 py-4">
        <li v-for="(item, index) in items" :key="index">
          <NuxtLink :to="item.url" class="text-dark font-weight-bold text-h5">
            <span class="d-flex align-center">
              <img
                :src="AnimatedIcon"
                alt="icon"
                class="icon-rotate hide-icon dark-icon"
              />
              <img
                :src="AnimatedIconPrimary"
                alt="icon"
                class="icon-rotate hide-icon primary-icon"
              />
              {{ item.title }}
            </span>
          </NuxtLink>
        </li>
      </ul>
      <v-row>
        <v-col cols="6" class="pe-1">
          <v-btn
            class="rounded-pill w-100 "
            variant="outlined"
            size="large"
            color="dark"
            elevation="0"
            to="/auth/signin"
          >
            Sign in
          </v-btn>
        </v-col>
        <v-col cols="6" class="ps-1">
          <v-btn
            class="rounded-pill w-100"
            color="dark"
            variant="flat"
            size="large"
            elevation="0"
            to="/auth/signup"
          >
            Sign up
          </v-btn>
        </v-col>
      </v-row>
      <div class="d-flex flex-column pt-6">
    
        <a
          href="mailto:contacto@aivision.cl"
          class="text-dark text-decoration-none text-h4"
          >contacto@aivision.cl</a
        >
      </div>
    </v-sheet>
  </v-menu>
</template>
