<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import AnimatedIcon from "/images/svgs/astrisk-icon.svg";

definePageMeta({
  layout: 'default',
});

const showViewerModal = ref(false);

const openViewer = () => {
  showViewerModal.value = true;
};

// Datos estáticos del proyecto
const post = {
  project_title: "Visor de Gemelos Digitales 3D",
  project_image: "/images/projects/PGemelos.jpg",
  tag1: "Visualización 3D",
  tag2: "Análisis Técnico",
  industry: "Industrial y Naval",
  description: `<p>Plataforma avanzada de visualización y análisis de gemelos digitales desarrollada con Angular y Three.js, que permite la inspección detallada de activos industriales mediante renderizado 3D de alta fidelidad.</p>
  
<h4>¿Qué son los Gemelos Digitales?</h4>
<p>Los gemelos digitales son réplicas virtuales exactas de activos físicos industriales y navales, capturados mediante fotogrametría, LiDAR y escaneo 3D. Estas réplicas digitales permiten realizar inspecciones remotas, análisis técnicos y mediciones precisas sin necesidad de estar físicamente en el lugar, optimizando tiempos y reduciendo riesgos operacionales.</p>

<h4>Capacidades Técnicas:</h4>

<p><strong>Visualización Multi-formato:</strong> Soporte para GLB/GLTF, PLY (nubes de puntos), OBJ, FBX y Gaussian Splats fotogramétricos, con renderizado PBR (Physically Based Rendering) y environment mapping HDR para realismo máximo.</p>

<p><strong>Sistema de Mediciones de Precisión:</strong> Herramientas de medición 3D que permiten obtener distancias exactas entre puntos, calcular áreas de superficies mediante triangulación de polígonos, y analizar volúmenes con precisión milimétrica. Esto permite realizar mediciones remotas tan precisas como si estuvieras físicamente en el sitio.</p>

<p><strong>Anotaciones Georreferenciadas:</strong> Sistema de marcadores 3D persistentes con overlays HTML sincronizados, almacenamiento en base de datos y generación automática de reportes técnicos para documentar hallazgos y coordinar trabajos de mantenimiento.</p>

<p><strong>Controles de Iluminación:</strong> Panel dinámico para ajuste en tiempo real de exposición (0.1-2.0), ambient light, hemisphere light, directional light con sombras, y environment map intensity para optimizar visualización según tipo de superficie y condiciones del activo.</p>`,
  detail_img_1: "/images/projects/details/pd-21.webp",
  detail_img_2: "/images/projects/details/pd-22.webp",
  detail_img_3: "/images/projects/details/pd-23.webp"
};
</script>

<template>
  <div class="project-details-page">
    <div class="common-banner position-relative">
      <v-img :src="post.project_image" cover height="650" class="w-100"></v-img>
      <div class="banner-overlay"></div>
      <div class="container-lg">
        <div class="common-banner-content">
          <p class="text-white text-h6 mb-4">{{ post.industry }}</p>
          <h1 class="text-white text-h2 mb-6">{{ post.project_title }}</h1>
          <div class="d-flex align-center ga-4 flex-wrap mb-6">
            <v-chip color="primary" label size="large">{{ post.tag1 }}</v-chip>
            <v-chip color="secondary" label size="large">{{ post.tag2 }}</v-chip>
          </div>
        </div>
      </div>
    </div>

    <SharedSectionSpacer />

    <div class="container-lg">
      <v-row>
        <v-col cols="12" md="12">
          <div class="blog-detail-content">
            <div class="project-desciption" v-html="post.description"></div>
          </div>
        </v-col>

        <!-- Botón para abrir el visor -->
        <v-col cols="12" class="mt-lg-16 mt-8">
          <div class="text-center">
            <v-btn
              :to="'/viewer'"
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
.common-banner {
  position: relative;
  overflow: hidden;
}

.banner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.7) 100%);
  z-index: 1;
}

.common-banner-content {
  position: relative;
  z-index: 2;
  padding: 100px 0 50px;
}

.project-desciption {
  font-size: 1.1rem;
  line-height: 1.8;
}

.project-desciption h4 {
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.project-desciption p {
  margin-bottom: 1rem;
}

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
