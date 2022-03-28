<template>
  <div class="container">
    <div class="columns is-12 is-variable">
      <Card
        field="nurseries"
        title="حضانات"
        :count="AuthData.nurseries"
        color-class="has-background-dark"
      />
      <Card
        field="isolation"
        title="غرفه عزل"
        :count="AuthData.isolation"
        color-class="has-background-primary	"
      />
      <Card
        field="room"
        title="غرفه عاديه"
        :count="AuthData.room"
        color-class="has-background-link"
      />
      <Card
        field="intensive"
        title="عنايه مركزه"
        :count="AuthData.intensive"
        color-class="has-background-info"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Card from "@/components/Card.vue";
import { useAuthStore } from "@/stores/auth";
const AuthData = useAuthStore();
</script>

<style scoped>
.container {
  margin-top: 50px;
}
.is-variable {
  flex-wrap: wrap;
}
</style>
