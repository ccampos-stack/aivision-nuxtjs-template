
<script setup lang="ts">
// Solución directa para subdirectorio AIVISION
const logoSrc = '/AIVISION/images/logos/DarkLogo2.png';
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