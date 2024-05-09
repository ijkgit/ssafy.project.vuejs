<script setup>
import Header1 from "@/components/common/Header1.vue";
import Header2 from "@/components/common/Header2.vue";
import { useRoute } from "vue-router";

const route = useRoute();
console.log(route);
</script>

<template>
  <!-- <div>Header</div> -->
  <!-- 상단 nav bar -->
  <Header1 v-if="route.name === 'main'" />
  <Header2 v-else />
  <RouterView />
</template>

<style scoped>
/* @import "@/assets/main/main.css"; */
</style>
