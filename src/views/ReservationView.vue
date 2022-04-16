<template>
  <div class="section">
    <table class="table is-bordered is-striped is-truncated">
      <thead>
        <tr>
          <th>أسم المريض</th>
          <th>البريد الإلكترونى</th>
          <th>رقم التلفون</th>
          <th>اليوم - شهر تاريخ الحضور</th>
          <th>اتمام الحضور</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="reservation in res">
          <td>{{ reservation.userName }}</td>
          <td>{{ reservation.userEmail }}</td>
          <td>{{ reservation.userPhone }}</td>
          <td>{{ reservation.day }} - {{ reservation.month }}</td>
          <td v-if="reservation.state == 0">
            <button class="button is-primary" @click="edit(reservation.id)">
              نتائج التحاليل
            </button>
          </td>
          <td v-if="reservation.state == 1">تم الحضور</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth";
import { computed } from "@vue/runtime-core";

const auth = useAuthStore();

const res = computed(() => {
  return auth.reservations;
});

function edit(id) {
  auth.editReservations(id);
}
</script>

<style>
.section,
.table {
  width: 100%;
}
</style>
