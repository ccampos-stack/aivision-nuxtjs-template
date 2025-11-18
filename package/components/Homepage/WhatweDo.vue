<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import img1 from "/images/projects/project3.webp";
import img2 from "/images/projects/whychoose.png";
import img3 from "/images/projects/details/pd-43.webp";
import img4 from "/images/projects/whatwedo.jpg";

// Add offset per item for vertical image movement (90px each step)
const items = [
  {
    title: "Brand identity",
    description:
      "When selecting a web design agency, it's essential to consider its reputation, experience, and the specific needs of your project.",
    image: img1,
    offset: -50,
  },
  {
    title: "Web development",
    description:
      "When selecting a web design agency, it's essential to consider its reputation, experience, and the specific needs of your project.",
    image: img2,
    offset: 80,
  },
  {
    title: "Content creation",
    description:
      "When selecting a web design agency, it's essential to consider its reputation, experience, and the specific needs of your project.",
    image: img3,
    offset: 200,
  },
  {
    title: "Motion & 3d modeling",
    description:
      "When selecting a web design agency, it's essential to consider its reputation, experience, and the specific needs of your project.",
    image: img4,
    offset: 350,
  },
];

const activeItem = ref(items[0]);
</script>

<template>
  <div class="position-relative bg-secondary" id="service">
    <SharedSectionSpacer />

    <div class="container-lg">
      <v-row>
        <!-- LEFT SIDE IMAGE -->
        <v-col cols="12" lg="4" class="position-relative">
          <SharedLeftSideLightHeading number="03" title="Services" />
        </v-col>

        <!-- RIGHT SIDE TEXT LIST -->
        <v-col cols="12" lg="8">
          <div class="d-flex flex-column ga-11">
            <SharedCommonHeadingWhite
              class="mw-670"
              title="What we do"
              subtitle="A glimpse into our creativity—exploring innovative designs, successful collaborations, and transformative digital experiences."
            />
          </div>
        </v-col>
      </v-row>

      <v-row class="mt-16">
        <!-- LEFT SIDE IMAGE -->
        <v-col cols="12" lg="4" md="6" class="position-relative">
          <v-fade-transition>
            <img
              v-if="activeItem"
              :src="activeItem.image"
              height="250"
              width="400"
              class="img-offset"
              style="
                transition: transform 0.5s ease;
                transform: translateY(var(--img-offset));
              "
              :style="{ '--img-offset': `${activeItem.offset}px` }"
            />
          </v-fade-transition>
        </v-col>

        <!-- RIGHT SIDE TEXT LIST -->
        <v-col cols="12" lg="8" md="6">
          <div>
            <div
              v-for="(item, index) in items"
              :key="index"
              @mouseenter="activeItem = item"
              class="py-md-12 py-8 border-t border-white border-opacity hover-primary-title"
            >
              <v-row class="align-center">
                <v-col cols="12" lg="5">
                  <h3 class="text-h3 font-weight-bold cursor-pointer title">
                    {{ item.title }}
                  </h3>
                </v-col>
                <v-col cols="12" lg="7" class="py-0">
                  <div >
                    <v-expand-transition>
                      <p
                        v-if="activeItem?.title === item.title"
                        class="text-white opacity-70"
                      >
                        {{ item.description }}
                      </p>
                    </v-expand-transition>
                  </div>
                </v-col>
              </v-row>
            </div>
          </div>
          <div class="mt-lg-12 mt-8">
          <v-btn class="interactive-button" to="" size="lg" flat>
            <span class="label">See Our Work</span>
            <v-avatar size="45" class="icon bg-white">
              <Icon icon="material-symbols:arrow-outward" class="text-secondary" height="20" />
            </v-avatar>
          </v-btn>
        </div>
        </v-col>
        
      </v-row>
    </div>

    <SharedSectionSpacer />
  </div>
</template>
