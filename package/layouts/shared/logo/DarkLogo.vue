
<script setup lang="ts">
// Usar runtime config para obtener baseURL correcto
const config = useRuntimeConfig();
const darkPrimaryLogo = `${config.app.baseURL}images/logos/DarkLogo2.png`.replace('//', '/');
</script>
<template>
    <div class="logo lh-normal">
        <NuxtLink to="/">
            <img :src="darkPrimaryLogo" alt="home" class="logo-img" />
        </NuxtLink>
    </div>
</template>

<style scoped>
.logo-img {
    width: auto;
    height: 54px;
}
</style>