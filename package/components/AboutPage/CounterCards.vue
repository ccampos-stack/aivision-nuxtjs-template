<script setup lang="ts">
import { ref, onMounted } from "vue";
import Logo from "@/layouts/shared/logo/index.vue";

type CounterItem = {
  value: number;
  suffix?: string;
  prefix?: string;
  title: string;
  description: string;
  animatedValue?: number;
};

const counters = ref<CounterItem[]>([
  {
    value: 45,
    suffix: "+",
    title: "Presence in global markets",
    description:
      "Expanding reach across international regions with localized expertise and worldwide impact.",
  },
  {
    value: 15,
    prefix: "$",
    suffix: "M",
    title: "In strategic investments",
    description:
      "Driving growth with curated partnerships and high-performing, audience-driven initiatives.",
  },
  {
    value: 158,
    suffix: "+",
    title: "Trusted brand collaborations",
    description:
      "Shaping industry conversations through innovation, creativity, and lasting influence.",
  },
]);

/**
 * Animate counters from 0 to their target value
 */
const startCounting = () => {
  counters.value.forEach((item) => {
    item.animatedValue = 0;
    const duration = 2000; // milliseconds
    const steps = 60;
    const increment = item.value / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      item.animatedValue = Math.round(increment * currentStep);

      if (currentStep >= steps) {
        item.animatedValue = item.value; // ensure final value
        clearInterval(interval);
      }
    }, duration / steps);
  });
};

onMounted(() => {
  startCounting();
});

/**
 * Increment counter value
 */
const increment = (index: number) => {
  counters.value[index].value++;
  counters.value[index].animatedValue = counters.value[index].value;
};

/**
 * Decrement counter value
 */
const decrement = (index: number) => {
  if (counters.value[index].value > 0) {
    counters.value[index].value--;
    counters.value[index].animatedValue = counters.value[index].value;
  }
};
</script>


<template>
  <div class="bg-darkgray">
  <SharedSectionSpacer />
  <div class="container-lg overflow-hidden">
    <v-row>
      <!-- LEFT SIDE IMAGE -->
      <v-col cols="12" lg="4">
        <Logo />
      </v-col>
      <v-col cols="12" lg="8">
        <div class="d-flex flex-column ga-lg-10 ga-8">
          <p class="text-subtitle-1">
            <strong>AI Vision</strong> nace como una evolución natural de <strong>Comercial C&D Group Limitada</strong>, una empresa fundada en Chile por el entusiasmo de dos hermanos y su padre, quien aportó una vasta experiencia en la comercialización de soluciones de alta performance en las áreas <strong>Naval e Industrial</strong> en América del Sur.
          </p>
          <p class="text-subtitle-1">
            Nuestra trayectoria se forjó en la búsqueda de <strong>soluciones técnicas de vanguardia</strong>, impulsando siempre la productividad y el cumplimiento normativo. En 2024-2025, dimos un paso estratégico para incorporar <strong>inspecciones marítimas e industriales</strong> y asesorías especializadas, evolucionando nuestro enfoque de productos a <strong>soluciones integrales</strong>.
          </p>
          <p class="text-subtitle-1">
            Esta expertiz técnica e industrial nos permitió dar el salto a <strong>AI Vision</strong>. Hoy, integramos esa solidez demostrable con la vanguardia tecnológica, incorporando nuevos especialistas para complementar nuestra experiencia con el expertise de la industria. Nuestra misión es clara: utilizar la <strong>Inteligencia Artificial, Gemelos Digitales, Drones Lidar</strong> y <strong>Modelado 3D</strong> para impulsar la <strong>seguridad, la precisión y la eficiencia operativa</strong> en los activos críticos de nuestros clientes.
          </p>
        </div>
      </v-col>
    </v-row>


  </div>
  <SharedSectionSpacer />
  </div>
</template>
