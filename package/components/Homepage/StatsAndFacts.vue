<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { ref, onMounted } from "vue";
import BgImage from "/images/background/bg-astrisk-icon.png";
import BgImageWhite from "/images/background/bg-astrisk-icon-white.png";

interface CounterItem {
  value: number;
  suffix: string;
  caption: string;
}

const items = ref<CounterItem[]>([
  {
    value: 40000,
    suffix: "K",
    caption: "Proyectos de IA Industrial Implementados",
  },
  {
    value: 238,
    suffix: "",
    caption: "Horas de Operación Optimizadas con IA",
  },
  {
    value: 3000000,
    suffix: "M",
    caption: "Precisión en Detección de Fallos Críticos",
  },
]);

// Animated values
const animatedValues = ref<number[]>(items.value.map(() => 0));

onMounted(() => {
  items.value.forEach((item, index) => {
    animateCounter(item.value, index);
  });
});

function animateCounter(target: number, index: number) {
  const duration = 2000;
  const frameDuration = 1000 / 60;
  const totalFrames = Math.round(duration / frameDuration);
  let frame = 0;

  const counterInterval = setInterval(() => {
    frame++;
    const progress = frame / totalFrames;
    const current = Math.floor(target * progress);
    animatedValues.value[index] = current;

    if (frame === totalFrames) {
      animatedValues.value[index] = target;
      clearInterval(counterInterval);
    }
  }, frameDuration);
}

function formatNumber(value: number, suffix: string) {
  if (suffix === "K") {
    return `${Math.floor(value / 1000)}K`;
  } else if (suffix === "M") {
    const millions = value / 1_000_000;
    return Number.isInteger(millions)
      ? `${millions}M`
      : `${millions.toFixed(1)}M`;
  } else {
    return `${value}`;
  }
}
</script>

<template>
  <div class="position-relative bg-surface overflow-hidden">
    <SharedSectionSpacer />
    <div class="container-lg">
      <v-row>
        <v-col cols="12" lg="4">
          <SharedLeftSideDarkHeading number="01" title="Quiénes Somos" />
        </v-col>
        <v-col cols="12" lg="8">
          <div class="d-flex flex-column ga-11">
            <SharedCommonHeading
              class="mw-md-575"
              title="La Nueva Era de la Inspección Naval e Industrial: Gemelos Digitales e IA."
              subtitle="Somos AI Vision: Un equipo multidisciplinario de expertos con vasta experiencia demostrable en el sector naval e industrial. Para implementar soluciones de alto impacto, utilizamos herramientas de última generación como: Drones, tecnología Lidar para escaneo 3D, software de procesamiento para fotogrametría, herramientas de medición de precisión y Gemelos Digitales, permitiendo el procesamiento de Master Plan y Tours Virtuales industriales."
            />

            <v-btn class="interactive-button" to="/about" size="lg" flat>
              <span class="label">Conoce a AI Vision</span>
              <v-avatar size="45" class="icon bg-white">
                <Icon icon="material-symbols:arrow-outward" height="20" />
              </v-avatar>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </div>
    <img :src="BgImage" alt="icon" class="bg-icon d-md-block d-none" />
    <img :src="BgImageWhite" alt="icon" class="bg-icon d-md-block d-none" />

    <SharedSectionSpacer />
  </div>
</template>
