<template>
  <Navbar />
  <RouterView />
</template>
<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();
</script>
<style>
.is-full {
  width: 100% !important;
}
</style>
