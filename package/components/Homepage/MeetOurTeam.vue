<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import img1 from "/images/team/team-img-1.png";
import img2 from "/images/team/team-img-2.png";
import img3 from "/images/team/team-img-3.png";
import img4 from "/images/team/team-img-4.png";

const items = [
  {
    name: "Alejandro Campos",
    role: "Naval Construction Engineer / New Business Manager",
    image: img1,
  },
  {
    name: "Gonzalo Campos",
    role: "NACE Professional / Technical Sales Manager",
    image: img2,
  },
  {
    name: "Cristian Campos",
    role: "IT Specialist / Business Manager",
    image: img3,
  },
  {
    name: "Gianfranco Sáez",
    role: "Drone & 3D Modeling Specialist",
    image: img4,
  },
  {
    name: "Karl Graf",
    role: "Project Management & Sustainability Engineer",
    image: img1,
  },
  {
    name: "Tamara Campos",
    role: "Marketing Manager",
    image: img2,
  },
];
</script>

<template>
  <div class="meet-team bg-darkgray">
  <SharedSectionSpacer />
  <div class="container-lg">
    <v-row>
      <v-col cols="12" lg="4">
        <SharedLeftSideDarkHeading number="06" title="Equipo Multidisciplinario" />
      </v-col>
      <v-col cols="12" lg="8">
        <div class="d-flex flex-column ga-11">
          <SharedCommonHeading
            class="mw-670"
            title="Conoce a Nuestro Equipo Experto"
            subtitle="Nuestro equipo combina una amplia experiencia en Inspección Marítima e Industrial con innovación tecnológica en Drones, Fotogrametría e IT, garantizando soluciones integrales y precisas para el sector."
          />
        </div>
      </v-col>
    </v-row>

    <v-row class="mt-lg-16 mt-8">
      <v-col cols="12" lg="3" md="6" v-for="item in items" :key="item.name">
        <div class="our-team lh-0 position-relative">
          <img
            :src="item.image"
            alt="team"
            class="w-100 obj-cover"
            height="470"
          />
          <div
            class="team-social d-flex ga-3 position-absolute "
          >
            <v-avatar size="44" class="social-icon cursor-pointer">
              <Icon
                icon="garden:twitter-stroke-12"
                height="18"
                class="text-secondary"
              />
            </v-avatar>
            <v-avatar size="44" class="social-icon cursor-pointer">
              <Icon
                icon="simple-icons:behance"
                height="18"
                class="text-secondary"
              />
            </v-avatar>
            <v-avatar size="44" class="social-icon cursor-pointer">
              <Icon
                icon="entypo-social:linkedin"
                height="18"
                class="text-secondary"
              />
            </v-avatar>
          </div>
          <div class="teambox"></div>
        </div>
        <div class="mt-5">
          <h4 class="text-h4">{{ item.name }}</h4>
          <p class="text-dark opacity-70">{{ item.role }}</p>
        </div>
      </v-col>
    </v-row>
  </div>

  <SharedSectionSpacer />
  </div>
</template>
