<script setup lang="ts">
// Ruta para dominio raíz www.aivision.cl
const logoSrc = '/images/logos/WhiteLogo.png';
</script>
<template>
    <div class="logo lh-normal">
        <NuxtLink to="/">
            <img :src="logoSrc" alt="home" class="logo-img" />
        </NuxtLink>
    </div>
</template>

<style scoped>
.logo-img {
    width: auto;
    height: 54px;
}
</style>