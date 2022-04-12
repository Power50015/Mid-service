<template>
  <div class="container">
    <div class="columns is-12 is-variable">
      <Card
        field="APositive"
        title="فصيله دم A+"
        :count="AuthData.APositive"
        color-class="has-background-success"
        img-data = "blood-types.jpg"
      />
      <Card
        field="ANegative"
        title="فصيله دم A-"
        :count="AuthData.ANegative"
        color-class="has-background-grey"
        img-data = "blood-types.jpg"
      />
      <Card
        field="BPositive"
        title="فصيله دم B+"
        :count="AuthData.BPositive"
        color-class="has-background-danger"
        img-data = "blood-types.jpg"
      />
      <Card
        field="BNegative"
        title="فصيله دم B-"
        :count="AuthData.BNegative"
        color-class="has-background-primary-dark"
        img-data = "blood-types.jpg"
      />
      <Card
        field="ABPositive"
        title="فصيله دم AB+"
        :count="AuthData.ABPositive"
        color-class="has-background-link-dark"
        img-data = "blood-types.jpg"
      />
      <Card
        field="ABNegative"
        title="فصيله دم AB-"
        :count="AuthData.ABNegative"
        color-class="has-background-info-dark"
        img-data = "blood-types.jpg"
      />
      <Card
        field="OPositive"
        title="فصيله دم O+"
        :count="AuthData.OPositive"
        color-class="has-background-success-dark"
        img-data = "blood-types.jpg"
      />
      <Card
        field="ONegative"
        title="فصيله دم O-"
        :count="AuthData.ONegative"
        color-class="has-background-danger-dark"
        img-data = "blood-types.jpg"
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
