<script setup lang="ts">
import { Icon } from "@iconify/vue";
import Bg from "/images/background/feature-imgAV.jpg";
const items = [
  {
    title: "Analítica Industrial",
  },
  {
    title: "Gemelos Digitales",
  },
  {
    title: "AI Vision",
  },
  {
    title: "Inspección con Drones",
  },
  {
    title: "Visión por Computadora",
  },
  {
    title: "Tours Virtuales VR",
  },
  {
    title: "Fotogrametría 3D",
  },
  {
    title: "Mantenimiento Predictivo",
  },
  {
    title: "Tecnología Lidar",
  },
  {
    title: "Seguridad Operacional",
  },
  {
    title: "Asset Management",
  },
  {
    title: "Inteligencia Artificial",
  },
  {
    title: "Analítica Industrial",
  },
  {
    title: "Gemelos Digitales",
  },
  {
    title: "AI Vision",
  },
  {
    title: "Inspección con Drones",
  },
  {
    title: "Visión por Computadora",
  },
  {
    title: "Tours Virtuales VR",
  },
  {
    title: "Fotogrametría 3D",
  },
  {
    title: "Mantenimiento Predictivo",
  },
  {
    title: "Tecnología Lidar",
  },
  {
    title: "Seguridad Operacional",
  },
  {
    title: "Asset Management",
  },
  {
    title: "Inteligencia Artificial",
  },
];
</script>
<template>
  <div class="lh-0">
    <img :src="Bg" class="w-100" />
  </div>
  <div
    class="marquee w-100 d-flex align-items-center overflow-hidden bg-primary py-6"
  >
    <div class="marquee-content d-flex align-items-center ga-8">
      <div
        class="d-flex align-center ga-8 flex-shrink-0"
        v-for="(item, index) in items"
        :key="index"
      >
        <h4 class="text-h4 text-secondary">{{ item.title }}</h4>
        <Icon
          icon="ci:dot-05-xl"
          class="text-secondary opacity-20"
          height="22"
        />
      </div>
    </div>
  </div>
</template>
