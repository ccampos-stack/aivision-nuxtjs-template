<script setup lang="ts">
import AnimatedIcon from "/images/svgs/astrisk-icon.svg";
</script>
<template>
  <v-container fluid class="hero-container pa-0">
    <!-- Video Background -->
    <video autoplay muted loop playsinline class="video-bg">
      <source src="/video/banner-video2.mp4" type="video/mp4" />
    </video>

    <!-- Dark overlay -->
    <div class="overlay"></div>

    <!-- Content bottom-left -->
    <div class="container-lg">
      <div class="hero-content">
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
              <span class="opacity-70">Impulsamos la</span>
              <span class="text-primary opacity-100">
                innovación industrial,
              </span>
              <span class="opacity-70"
                >convirtiendo procesos complejos en ecosistemas digitales inteligentes y eficientes.</span
              >
            </p>
          </div>
        </div>

        <!-- Bottom row: title + badge -->
        <div class="d-flex flex-md-row flex-column ga-5 align-md-end align-start mt-md-6 mt-3">
          <h1 class="text-white text-h1 font-weight-bold mb-0">AIVision</h1>
          <SharedBigBadge />
        </div>
      </div>
    </div>
  </v-container>
</template>

<style scoped>
.hero-container {
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.video-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2;
}

.hero-content {
  position: absolute;
  bottom: 80px;
  left: 40px;
  z-index: 3;
}

.icon-rotate {
  animation: rotate 8s linear infinite;
  filter: brightness(0) saturate(0%) invert(80%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%);
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .hero-content {
    bottom: 40px;
    left: 20px;
    right: 20px;
  }
}
</style>
