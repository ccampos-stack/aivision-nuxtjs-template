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

const iframeUrl = computed(() => {
  const title = post.value?.project_title?.toLowerCase() || '';
  if (title.includes('prodiver') || title.includes('recorrido virtual prodiver')) {
    return 'https://garnetchile.cl/ProdiverTV/';
  } else if (title.includes('master plan puertecillo') || title.includes('puertecillo')) {
    return 'https://garnetchile.cl/Masterplan/';
  }
  return null;
});

const iframeTitle = computed(() => {
  const title = post.value?.project_title?.toLowerCase() || '';
  if (title.includes('prodiver') || title.includes('recorrido virtual prodiver')) {
    return 'Recorrido Virtual Prodiver';
  } else if (title.includes('master plan puertecillo') || title.includes('puertecillo')) {
    return 'Master Plan Puertecillo';
  }
  return 'Recorrido Virtual';
});

const isViewerProject = computed(() => {
  const title = post.value?.project_title?.toLowerCase() || '';
  return title.includes('visor de gemelos digitales') || title.includes('gemelos digitales 3d');
});

const showViewerModal = ref(false);

const openViewer = () => {
  showViewerModal.value = true;
};
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
                creatividad, estrategia</span
              >
              <span class="opacity-70"
                > y resultados: explora los proyectos que nos definen.</span
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
        <span class="label">Volver</span>
      </v-btn>

      <div class="d-flex flex-md-row flex-column ga-10 mt-10">
        <div class="pr-md-10 pr-4 border-e">
          <p class="text-subtitle-2 text-dark opacity-70">Alcance del Proyecto</p>
          <div class="d-flex ga-2 mt-2">
            <span class="text-subtitle-1 font-weight-medium"
              >{{ post.tag1 }},</span
            >
            <span class="text-subtitle-1 font-weight-medium">{{
              post.tag2
            }}</span>
          </div>
        </div>
        <div class="pr-md-10 pr-4">
          <p class="text-subtitle-2 text-dark opacity-70">Industria</p>
          <div class="d-flex ga-2 mt-2">
            <span class="text-subtitle-1 font-weight-medium">{{
              post.industry
            }}</span>
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
        <!-- Botón para abrir el visor en modal -->
        <v-col cols="12" class="mt-lg-16 mt-8" v-if="isViewerProject">
          <div class="text-center">
            <v-btn
              @click.prevent.stop="openViewer"
              color="primary"
              size="x-large"
              elevation="4"
              class="text-h6 px-8 py-6"
            >
              <Icon icon="mdi:cube-scan" height="28" class="mr-3" />
              Abrir Visor 3D
            </v-btn>
          </div>
        </v-col>

        <!-- Iframes para otros proyectos -->
        <v-col cols="12" class="mt-lg-16 mt-8" v-else-if="iframeUrl">
          <div class="iframe-container" style="position: relative; width: 100%; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
            <iframe
              :src="iframeUrl"
              style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;"
              allowfullscreen
              loading="lazy"
              :title="iframeTitle"
            ></iframe>
          </div>
        </v-col>
      </v-row>
    </div>

    <SharedSectionSpacer />
  </div>

  <!-- Modal del Visor 3D -->
  <v-dialog
    v-model="showViewerModal"
    fullscreen
    transition="dialog-bottom-transition"
  >
    <v-card class="viewer-modal">
      <div class="viewer-modal-content">
        <iframe
          src="/viewer?modal=true"
          style="width: 100%; height: 100%; border: none; display: block;"
          title="Visor de Gemelos Digitales 3D"
        ></iframe>
        <v-btn
          icon
          size="large"
          color="error"
          class="viewer-close-btn"
          @click="showViewerModal = false"
          elevation="6"
        >
          <Icon icon="mdi:close" height="32" />
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.viewer-modal {
  position: relative;
  width: 100%;
  height: 100%;
  background: #000;
}

.viewer-modal-content {
  position: relative;
  width: 100%;
  height: 100%;
}

.viewer-close-btn {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 10000;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5) !important;
}

.viewer-close-btn:hover {
  transform: scale(1.1);
  transition: transform 0.2s ease;
}
</style>
