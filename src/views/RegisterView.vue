<template>
  <div class="home">
    <section class="hero is-primary is-fullheight">
      <div class="hero-body">
        <div class="container">
          <h1 class="has-text-centered is-size-1 pb-6 is-block">
            عمل حساب مستشفى جديد
          </h1>
          <div class="columns is-centered">
            <div class="column is-5-tablet is-4-desktop is-3-widescreen">
              <form class="box" @submit.prevent="saveUser">
                <div class="field">
                  <label for="name" class="label">أسم المستشفى</label>
                  <div class="control has-icons-left">
                    <input
                      type="text"
                      class="input"
                      id="name"
                      required
                      v-model="name"
                    />
                  </div>
                </div>
                <div class="field">
                  <label for="area" class="label">المنطقه</label>
                  <div class="control has-icons-left">
                    <div class="select is-primary is-full">
                      <select class="is-full" v-model="area" id="area">
                        <option>القاهره</option>
                        <option>الإسكندريه</option>
                        <option>الجيزة</option>
                        <option>السويس</option>
                        <option>الإسماعيلية</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="field">
                  <label for="address" class="label">العنوان تفصيلا</label>
                  <div class="control has-icons-left">
                    <input
                      type="text"
                      class="input"
                      required
                      v-model="address"
                      id="address"
                    />
                  </div>
                </div>
                <div class="field">
                  <label for="email" class="label">البريد الإلكترونى</label>
                  <div class="control has-icons-left">
                    <input
                      type="email"
                      placeholder="e.g. bobsmith@gmail.com"
                      class="input"
                      required
                      id="email"
                      v-model="email"
                    />
                  </div>
                </div>
                <div class="field">
                  <label for="password" class="label">كلمه السر</label>
                  <div class="control has-icons-left">
                    <input
                      type="password"
                      placeholder="*******"
                      class="input"
                      id="password"
                      v-model="password"
                      required
                    />
                  </div>
                </div>
                <div class="field">
                  <button class="button is-success" type="submit">
                    تسجيل الدخول
                  </button>
                </div>
              </form>
              <router-link
                class="link text-center fw-bold"
                aria-current="page"
                to="/login"
                >تسجيل الدخول</router-link
              >
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

const name = ref<string>("");
const email = ref<string>("");
const area = ref<string>("القاهره");
const address = ref<string>("");
const password = ref<string>("");

const router = useRouter();
const auth = useAuthStore();

function saveUser() {
  auth.addHostpital(
    name.value,
    address.value,
    area.value,
    email.value,
    password.value
  );
  name.value = "";
  address.value = "";
  area.value = "القاهره";
  email.value = "";
  password.value = "";

  router.push("/");
}
</script>
