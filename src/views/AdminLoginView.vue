<template>
  <div class="home">
    <section class="hero is-primary is-fullheight">
      <div class="hero-body">
        <div class="container">
          <h1 class="has-text-centered is-size-1 pb-6 is-block">
            تسجيل الدخول أدمن
          </h1>
          <div class="columns is-centered">
            <div class="column is-5-tablet is-4-desktop is-3-widescreen">
              <form class="box" @submit.prevent="loginUser">
                <div class="field">
                  <label for="email" class="label">البريد الإلكترونى</label>
                  <div class="control has-icons-left">
                    <input
                      type="email"
                      placeholder="e.g. bobsmith@gmail.com"
                      class="input"
                      required
                      v-model="email"
                    />
                    <span class="icon is-small is-left">
                      <i class="fa fa-envelope"></i>
                    </span>
                  </div>
                </div>
                <div class="field">
                  <label for="password" class="label">كلمه السر</label>
                  <div class="control has-icons-left">
                    <input
                      type="password"
                      placeholder="*******"
                      class="input"
                      required
                      v-model="password"
                    />
                    <span class="icon is-small is-left">
                      <i class="fa fa-lock"></i>
                    </span>
                  </div>
                </div>
                <div class="field">
                  <button class="button is-success" type="submit">
                    تسجيل الدخول
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth";
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";

const email = ref<string>("admin@admin.com");
const password = ref<string>("admin@admin.com");

const router = useRouter();
const auth = useAuthStore();

function loginUser() {
  auth.adminLogin(email.value, password.value);
  email.value = "";
  password.value = "";

  router.push("/admin-dashborad");
}
</script>
