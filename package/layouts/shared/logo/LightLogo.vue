<script setup lang="ts">
import LightLogo from '/images/logos/WhiteLogo.png';
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