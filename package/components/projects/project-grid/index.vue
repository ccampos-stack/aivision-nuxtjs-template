<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useProjectsGridStore } from "@/store/project";
import { Icon } from "@iconify/vue";
import { Carousel, Slide } from "vue3-carousel";
import { Pagination as CarouselPagination } from "vue3-carousel";
import type { CarouselSettings } from "vue3-carousel";

const sliderSettings: CarouselSettings = {
  snapAlign: "start",
  itemsToShow: 4,
  wrapAround: true,
  breakpoints: {
    1800: {
      itemsToShow: 4,
      snapAlign: "start",
    },
    1600: {
      itemsToShow: 3,
      snapAlign: "start",
    },
    1368: {
      itemsToShow: 3,
      snapAlign: "start",
    },
    1024: {
      itemsToShow: 2,
      snapAlign: "center",
    },

    768: {
      itemsToShow: 2,
      snapAlign: "center",
    },
    300: {
      itemsToShow: 1,
      snapAlign: "center",
    },
  },
};

const store = useProjectsGridStore();

onMounted(() => {
  store.fetchPosts();
});

const getPosts = computed(() => store.projectGrid);

const slugify = (title?: string) => {
  if (!title) return "";
  return title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};
</script>

<template>
  <div>
    <carousel
      class="overflow-hidden"
      :snapAlign="sliderSettings.snapAlign"
      :itemsToShow="sliderSettings.itemsToShow"
      :wrapAround="sliderSettings.wrapAround"
      :breakpoints="sliderSettings.breakpoints"
    >
      <slide v-for="projects in getPosts" :key="projects.id">
        <div>
          <NuxtLink
            :to="`/projects/${slugify(projects.project_title)}`"
            class="project-card"
          >
            <div class="image-wrapper lh-0">
              <img
                :src="projects.project_image"
                alt="image"
                class="project-image w-100"
                cover
              />
              <div class="image-overlay">
                <v-avatar size="60" class="icon bg-primary">
                  <Icon icon="material-symbols:arrow-outward" height="25" />
                </v-avatar>
              </div>
            </div>
          </NuxtLink>
          <h3 class="text-h3 text-dark py-5">
            {{ projects.project_title }}
          </h3>
          <div class="d-flex ga-3">
            <v-chip variant="outlined" class="text-subtitle-2 text-dark">{{
              projects.tag1
            }}</v-chip>
            <v-chip variant="outlined" class="text-subtitle-2 text-dark">{{
              projects.tag2
            }}</v-chip>
          </div>
        </div>
      </slide>
      <template #addons>
        <CarouselPagination />
      </template>
    </carousel>
  </div>
</template>
