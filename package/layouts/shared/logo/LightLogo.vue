<script setup lang="ts">
// Usar runtime config para obtener baseURL correcto
const config = useRuntimeConfig();
const LightLogo = `${config.app.baseURL}images/logos/WhiteLogo.png`.replace('//', '/');
</script>
<template>
    <div class="logo lh-normal">
        <NuxtLink to="/">
            <img :src="LightLogo" alt="home" class="logo-img" />
        </NuxtLink>
    </div>
</template>

<style scoped>
.logo-img {
    width: auto;
    height: 54px;
}
</style>