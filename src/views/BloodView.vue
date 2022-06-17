<template>
  <div class="container">
    <div class="columns is-12 is-variable">
      <Card
        field="apositive"
        title="فصيله دم A+"
        :count="AuthData.apositive"
        priceField="apositiveprice"
        :priceCount="AuthData.apositiveprice"
        color-class="has-background-success"
        img-data="blood-types.jpg"
      />
      <Card
        field="anegative"
        title="فصيله دم A-"
        :count="AuthData.anegative"
        priceField="anegativeprice"
        :priceCount="AuthData.anegativeprice"
        color-class="has-background-grey"
        img-data="blood-types.jpg"
      />
      <Card
        field="bpositive"
        title="فصيله دم B+"
        :count="AuthData.bpositive"
        priceField="bpositiveprice"
        :priceCount="AuthData.bpositiveprice"
        color-class="has-background-danger"
        img-data="blood-types.jpg"
      />
      <Card
        field="bnegative"
        title="فصيله دم B-"
        :count="AuthData.bnegative"
        priceField="bnegativeprice"
        :priceCount="AuthData.bnegativeprice"
        color-class="has-background-primary-dark"
        img-data="blood-types.jpg"
      />
      <Card
        field="abpositive"
        title="فصيله دم AB+"
        :count="AuthData.abpositive"
        priceField="abpositiveprice"
        :priceCount="AuthData.abpositiveprice"
        color-class="has-background-link-dark"
        img-data="blood-types.jpg"
      />
      <Card
        field="abnegative"
        title="فصيله دم AB-"
        :count="AuthData.abnegative"
        priceField="abnegativeprice"
        :priceCount="AuthData.abnegativeprice"
        color-class="has-background-info-dark"
        img-data="blood-types.jpg"
      />
      <Card
        field="opositive"
        title="فصيله دم O+"
        :count="AuthData.opositive"
        priceField="opositiveprice"
        :priceCount="AuthData.opositiveprice"
        color-class="has-background-success-dark"
        img-data="blood-types.jpg"
      />
      <Card
        field="onegative"
        title="فصيله دم O-"
        :count="AuthData.onegative"
        priceField="onegativeprice"
        :priceCount="AuthData.onegativeprice"
        color-class="has-background-danger-dark"
        img-data="blood-types.jpg"
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
