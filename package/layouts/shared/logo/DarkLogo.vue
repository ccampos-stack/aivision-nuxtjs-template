
<script setup lang="ts">
import darkPrimaryLogo from '/images/logos/DarkLogo2.png';
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