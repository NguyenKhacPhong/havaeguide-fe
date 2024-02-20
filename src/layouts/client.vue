<template>
    <TheHeader/>
    <TheMenu />
    <router-view></router-view>
    <TheFooter/>
</template>
<script setup>
import TheHeader from "../components/TheHeader.vue"
import TheMenu from "../components/TheMenu.vue"
import TheFooter from "../components/TheFooter.vue"
</script>

