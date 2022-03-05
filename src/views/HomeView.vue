<template>
  <header class="is-fullwidth">
    <div class="contant mx-10">
      <h1
        class="has-text-centered is-size-1 pb-6 is-block has-text-grey-darker has-text-weight-bold"
      >
        سجل كامستشفى و استفد بموقعنا فى الدعايا
      </h1>
      <router-link class="button" aria-current="page" to="/login">
        <strong>عمل حساب</strong>
      </router-link>
    </div>
  </header>
</template>
<script setup lang="ts"></script>

<style scoped>
header {
  background-image: url("../assets/header.jpg");
  height: 100vh;
  width: 100%;
  background-attachment: fixed;
  background-size: cover;
}
header .contant {
  background-color: rgba(129, 129, 126, 0.471);
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  flex-wrap: nowrap;
  align-content: flex-end;
  align-items: center;
}
header .contant h1 {
  display: block;
}
</style>