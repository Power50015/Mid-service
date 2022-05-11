<template>
  <div class="section">
    <table class="table is-bordered is-striped is-truncated">
      <thead>
        <tr>
          <th>المريض</th>
          <th>اليوم - شهر تاريخ الحضور</th>
          <th>اليوم - شهر تاريخ الخروج</th>
          <th>نوع الخدمه</th>
          <th>اتمام الحضور</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="reservation in res">
          <div class="modal" v-if="showModel == reservation.userEmail">
            <div class="modal-background" @click="showModel = ''"></div>
            <div class="modal-card">
              <header class="modal-card-head">
                <p class="modal-card-title">المريض</p>
                <button
                  class="delete"
                  aria-label="close"
                  @click="showModel = ''"
                ></button>
              </header>
              <section class="modal-card-body">
                <h2>{{ reservation.userName }}</h2>
                <h2>{{ reservation.userEmail }}</h2>
                <h2>{{ reservation.userPhone }}</h2>
              </section>
              <footer class="modal-card-foot">
                <button class="button" @click="showModel = ''">الخروج</button>
              </footer>
            </div>
          </div>
          <td @click="showModel = reservation.userEmail">
            {{ reservation.userName }}
          </td>
          <td>{{ reservation.day }} - {{ reservation.month }}</td>
          <td>{{ reservation.endDay }} - {{ reservation.endMonth }}</td>
          <td>{{ service(reservation.service) }}</td>
          <td v-if="reservation.state == 0">
            <button class="button is-primary" @click="edit(reservation.id)">
              أتمام الحضور
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth";
import { computed, ref } from "@vue/runtime-core";

const auth = useAuthStore();
const showModel = ref(false);
const res = computed(() => {
  return auth.reservations;
});

function edit(id) {
  auth.editReservations(id);
}

function service(name) {
  switch (name) {
    case "room":
      return "غرفه عاديه";
      break;
    case "isolation":
      return "غرف عزل كرونا";
      break;
    case "nurseries":
      return "حضانه";
      break;
    case "intensive":
      return "عنايه مركزه";
      break;
    case "apositive":
      return "A+";
      break;
    case "anegative":
      return "A-";
      break;
    case "bpositive":
      return "B+";
      break;
    case "bnegative":
      return "B-";
      break;
    case "abpositive":
      return "AB+";
      break;
    case "abnegative":
      return "AB-";
      break;
    case "opositive":
      return "O+";
      break;
    case "onegative":
      return "O-";
      break;
  }
}
</script>

<style scoped>
.section,
.table {
  width: 100%;
}
.modal {
  display: flex;
}
.modal-background {
  background-color: rgb(10 10 10 / 25%);
}
</style>
