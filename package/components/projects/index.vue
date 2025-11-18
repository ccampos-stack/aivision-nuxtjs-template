<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useProjectsGridStore } from "@/store/project";
import { Icon } from "@iconify/vue";

const store = useProjectsGridStore();

onMounted(() => {
  store.fetchPosts();
});

const getPosts = computed(() => store.projectGrid);

// Slug function to create URL-friendly links
const slugify = (title?: string) => {
  if (!title) return "";
  return title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};
</script>

<template>
  <div class="bg-darkgray">
  <SharedSectionSpacer />  
  <div class="container-lg">
    <v-row>
      <v-col cols="12" lg="6" v-for="projects in getPosts" :key="projects.id">
        <div>
          <NuxtLink
            :to="`/projects/${slugify(projects.project_title)}`"
            class="project-card"
          >
            <div class="image-wrapper">
              <v-img
                :src="projects.project_image"
                alt="image"
                class="project-image w-100"
                cover
                height="500"

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
      </v-col>
    </v-row>
  </div>
  <SharedSectionSpacer />
  </div>
</template>
