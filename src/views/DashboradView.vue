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
      <Card
        field="APositive"
        title="فصيله دم A+"
        :count="AuthData.APositive"
        color-class="has-background-success"
      />
      <Card
        field="ANegative"
        title="فصيله دم A-"
        :count="AuthData.ANegative"
        color-class="has-background-grey"
      />
      <Card
        field="BPositive"
        title="فصيله دم B+"
        :count="AuthData.BPositive"
        color-class="has-background-danger"
      />
      <Card
        field="BNegative"
        title="فصيله دم B-"
        :count="AuthData.BNegative"
        color-class="has-background-primary-dark"
      />
      <Card
        field="ABPositive"
        title="فصيله دم AB+"
        :count="AuthData.ABPositive"
        color-class="has-background-link-dark"
      />
      <Card
        field="ABNegative"
        title="فصيله دم AB-"
        :count="AuthData.ABNegative"
        color-class="has-background-info-dark"
      />
      <Card
        field="OPositive"
        title="فصيله دم O+"
        :count="AuthData.OPositive"
        color-class="has-background-success-dark"
      />
      <Card
        field="ONegative"
        title="فصيله دم O-"
        :count="AuthData.ONegative"
        color-class="has-background-danger-dark"
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
