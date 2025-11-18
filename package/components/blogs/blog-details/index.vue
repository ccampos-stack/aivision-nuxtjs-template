<script setup lang="ts">
import { ref } from "vue";
import { onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useblogGridStore } from "@/store/blogs";
import AnimatedIcon from "/images/svgs/astrisk-icon.svg";
const title = useRoute();
const getTitle = title.path.split("/").pop();

onMounted(() => {
  store.fetchPost(`${getTitle}`);
  store.fetchPosts();
});
const store = useblogGridStore();

const post = computed(() => {
  return store.selectedblog;
});
</script>

<template>
  <div class="common-banner position-relative">
    <v-img :src="post.blog_image" cover height="650" class="w-100"></v-img>
    <div class="banner-overlay"></div>
    <div class="container-lg">
      <div class="common-banner-content">
        <div class="mw-575">
          <!-- Top row: icon + paragraph -->
          <div class="d-flex ga-6">
            <img
              :src="AnimatedIcon"
              alt="icon"
              height="44"
              width="44"
              class="icon-rotate"
            />
            <p class="text-white text-subtitle-1 mb-0 opacity-70">
              In a world where standing still means falling behind, we knew it
              was time for a bold transformation..
            </p>
          </div>
        </div>
        <!-- Bottom row: title + badge -->
        <div
          class="d-flex flex-md-row flex-column ga-5 align-md-end align-start mt-md-6 mt-3"
        >
          <h1 class="text-white text-60 font-weight-bold mb-0">
            {{ post.blog_title }}
          </h1>
          <SharedBigBadge />
        </div>
      </div>
    </div>
  </div>
  <!-- Blog Details -->
  <div class="bg-darkgray">
    <SharedSectionSpacer />
    <div class="container-lg">
      <v-row class="d-flex align-center">
        <!-- LEFT SIDE IMAGE -->
        <v-col cols="12" lg="4">
          <h2 class="text-60 text-dark">Scroll to read</h2>
        </v-col>
        <v-col cols="12" lg="8"
          ><p class="text-dark text-subtitle-1 opacity-70">
            At AIVision, we're always evolving, and our latest brand redesign is
            a bold step forward. This transformation reflects our commitment to
            innovation and growth, both in how we look and how we connect with
            you.
          </p>
        </v-col>
        <v-col cols="12" class="mt-lg-16 mt-8">
          <div class="lh-0">
            <v-img
              :src="post.blog_inner_image"
              alt="project inner image"
              class="w-100"
              cover
              height="600"
            ></v-img>
          </div>
        </v-col>
        <v-col cols="12" lg="4"></v-col>
        <v-col cols="12" lg="8"
          ><div
            class="project-desciption mt-lg-16 mt-8"
            v-html="post.blog_description"
          ></div
        ></v-col>
      </v-row>
    </div>
    <SharedSectionSpacer />
  </div>
</template>
