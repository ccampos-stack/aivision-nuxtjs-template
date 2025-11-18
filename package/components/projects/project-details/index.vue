<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import { onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useProjectsGridStore } from "@/store/project";
import AnimatedIcon from "/images/svgs/astrisk-icon.svg";

const formattedDescription = computed(() => {
  if (!post.value?.description) return "";

  // Replace newline characters with <br> tags
  return post.value.description.replace(/\n/g, "<br>");
});
const title = useRoute();
const getTitle = title.path.split("/").pop();

onMounted(() => {
  store.fetchPost(`${getTitle}`);
  store.fetchPosts();
});
const store = useProjectsGridStore();

const post = computed(() => {
  return store.selectedProjects;
});
</script>

<template>
  <div class="common-banner position-relative">
    <v-img :src="post.project_image" cover height="650" class="w-100"></v-img>
    <div class="banner-overlay"></div>
    <div class="container-lg">
      <div class="common-banner-content">
        <div class="mw-460">
          <!-- Top row: icon + paragraph -->
          <div class="d-flex ga-6">
            <img
              :src="AnimatedIcon"
              alt="icon"
              height="44"
              width="44"
              class="icon-rotate"
            />
            <p class="text-white text-subtitle-1 mb-0">
              <span class="opacity-70">A</span>
              <span class="text-primary opacity-100">
                showcase of creativity</span
              >
              <span class="opacity-70"
                >, strategy, and results explore the projects that define
                us.</span
              >
            </p>
          </div>
        </div>
        <!-- Bottom row: title + badge -->
        <div
          class="d-flex flex-md-row flex-column ga-5 align-md-end align-start mt-md-6 mt-3"
        >
          <h1 class="text-white text-h1 font-weight-bold mb-0">
            {{ post.project_title }}
          </h1>
          <SharedBigBadge />
        </div>
      </div>
    </div>
  </div>

  <!-- Project Details -->
  <div class="bg-darkgray">
    <SharedSectionSpacer />
    <div class="container-lg">
      <v-btn class="interactive-button-small" to="/projects" size="lg" flat>
        <v-avatar size="30" class="icon bg-white">
          <Icon icon="material-symbols-light:arrow-back-rounded" height="20" />
        </v-avatar>
        <span class="label">Back</span>
      </v-btn>

      <div class="d-flex flex-md-row flex-column ga-10 mt-10">
        <div class="pr-md-10 pr-4 border-e">
          <p class="text-subtitle-2 text-dark opacity-70">Scope of work</p>
          <div class="d-flex ga-2 mt-2">
            <span class="text-subtitle-1 font-weight-medium"
              >{{ post.tag1 }},</span
            >
            <span class="text-subtitle-1 font-weight-medium">{{
              post.tag2
            }}</span>
          </div>
        </div>
        <div class="pr-md-10 pr-4 border-e">
          <p class="text-subtitle-2 text-dark opacity-70">Industry</p>
          <div class="d-flex ga-2 mt-2">
            <span class="text-subtitle-1 font-weight-medium">{{
              post.industry
            }}</span>
          </div>
        </div>
        <div class="pr-md-10 pr-4 border-e">
          <p class="text-subtitle-2 text-dark opacity-70">Raised</p>
          <div class="d-flex ga-2 mt-2">
            <span class="text-subtitle-1 font-weight-medium">{{
              post.raised
            }}</span>
          </div>
        </div>
        <div class="">
          <p class="text-subtitle-2 text-dark opacity-70">Website</p>
          <div class="d-flex ga-2 mt-2">
            <span class="text-subtitle-1 font-weight-medium"
              >www.aivision.com</span
            >
          </div>
        </div>
      </div>
      <SharedSectionSpacer />
      <v-row>
        <!-- LEFT SIDE IMAGE -->
        <v-col cols="12" lg="4">
          <h2 class="text-60 text-dark">Description</h2>
        </v-col>
        <v-col cols="12" lg="8">
          <div class="d-flex flex-column ga-lg-10 ga-8">
            <div class="project-desciption" v-html="post.description"></div>
          </div>
        </v-col>
        <v-col cols="12" class="mt-lg-16 mt-8">
          <div class="lh-0">
            <img
              :src="post.detail_img_1"
              alt="project inner image"
              class="w-100"
            />
          </div>
        </v-col>
        <v-col cols="12" lg="6">
          <img
            :src="post.detail_img_2"
            alt="project inner image"
            class="w-100"
          />
        </v-col>
        <v-col cols="12" lg="6">
          <img
            :src="post.detail_img_3"
            alt="project inner image"
            class="w-100"
          />
        </v-col>
      </v-row>
    </div>

    <SharedSectionSpacer />
  </div>
</template>
