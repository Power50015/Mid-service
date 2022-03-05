<template>
  <Navbar />
  <RouterView />
</template>
<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
</script>
<style>
.is-full {
  width: 100% !important;
}
</style>
