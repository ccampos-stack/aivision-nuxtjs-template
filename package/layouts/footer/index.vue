<script setup lang="ts">
import { Icon } from "@iconify/vue";
const FooterLinks = ref([
  {
    title: "Inicio",
    url: "/",
  },
  {
    title: "Nosotros",
    url: "/about",
  },
  {
    title: "Blog",
    url: "/blog",
  },
  {
    title: "Proyectos",
    url: "/projects",
  },
]);

const SocialLinks = ref([
  {
    title: "LinkedIn",
    url: "https://cl.linkedin.com/company/cyd-group-chile",
  },
  {
    title: "Instagram",
    url: "https://www.instagram.com/cydgroup_chile/?igsh=MXM1czlyOTE2Y21yMw%3D%3D&utm_source=qr#",
  },
]);
</script>
<template>
  <div class="bg-secondary">
    <SharedSectionSpacer />
    <div class="container-lg">
      <v-row>
        <v-col cols="12" lg="5">
          <div class="d-flex flex-column ga-10">
            <h2 class="text-h2 pe-lg-16">¿Construyamos algo juntos?</h2>
            <div>
              <div class="d-flex flex-column ga-2">
                <NuxtLink
                  href="mailto:contacto@aivision.cl"
                  class="d-flex ga-3 align-center text-white text-decoration-none hover-primary-link"
                >
                  <Icon
                    icon="material-symbols:arrow-outward"
                    height="24"
                    class="text-primary"
                  />
                  contacto@aivision.cl</NuxtLink
                >
                <NuxtLink
                  href="https://maps.app.goo.gl/"
                  target="_blank"
                  class="d-flex ga-3 align-center text-white text-decoration-none hover-primary-link"
                >
                  <Icon
                    icon="uil:map-marker"
                    height="24"
                    class="text-primary"
                  />Valparaíso, Chile</NuxtLink
                >
              </div>
            </div>
          </div>
        </v-col>
        <v-col cols="12" lg="2" md="4">
          <ul class="list-style-none d-flex flex-column ga-2">
            <li v-for="(item, i) in FooterLinks" :key="i" class="">
              <NuxtLink :to="item.url" class="text-subtitle-1 text-white text-decoration-none hover-primary-link ">{{ item.title }}</NuxtLink>
            </li>
          </ul>
        </v-col>
        <v-col cols="12" lg="2" md="4">
            <ul class="list-style-none d-flex flex-column ga-2">
            <li v-for="(item, i) in SocialLinks" :key="i" class="">
              <NuxtLink :to="item.url" target="_blank" class="text-subtitle-1 text-white text-decoration-none hover-primary-link ">{{ item.title }}</NuxtLink>
            </li>
          </ul>
        </v-col>
        <v-col cols="12" lg="3" md="4">
            <p class="text-subtitle-1 text-white text-lg-right text-left">© AIVision copyright 2025</p>
        </v-col>
      </v-row>
    </div>
    <SharedSectionSpacer />

    <ScrollToTop/>
  </div>
</template>
