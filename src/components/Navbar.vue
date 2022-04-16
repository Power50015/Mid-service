<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link
        class="navbar-item"
        aria-current="page"
        to="/"
        v-if="!auth.isLogin"
      >
        <img src="@/assets/logo.png" width="70" height="28" />
      </router-link>
      <router-link
        class="navbar-item"
        aria-current="page"
        to="/dashborad"
        v-if="auth.isLogin"
      >
        <img src="@/assets/logo.png" width="70" height="28" />
      </router-link>

      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <router-link
          class="navbar-item"
          aria-current="page"
          to="/dashborad"
          v-if="auth.isLogin"
          >الخدمات</router-link
        >
        <router-link
          class="navbar-item"
          aria-current="page"
          to="/blood"
          v-if="auth.isLogin"
          >فصائل الدم</router-link
        >
        <router-link
          class="navbar-item"
          aria-current="page"
          to="/reservation"
          v-if="auth.isLogin"
          >الحجوزات</router-link
        >
        
      </div>

      <div class="navbar-end">
        <!-- <div class="navbar-item has-dropdown is-hoverable" v-if="auth.isLogin">
          <router-link
            class="navbar-item navbar-link"
            aria-current="page"
            to="/profile"
            v-if="auth.isLogin"
          >
            <img :src="auth.image" class="nav-profile-image" />
            <span>{{ auth.name }}</span>
          </router-link>
          <div class="navbar-dropdown">
            <button
              class="nav-link mx-4 button is-primary navbar-item"
              aria-current="page"
              v-if="auth.isLogin"
              @click="auth.logout"
            >
              <strong>تسجيل خروج</strong>
            </button>
          </div>
        </div> -->
        
        <div class="navbar-item">
          <router-link
            class="navbar-item"
            aria-current="page"
            to="/profile"
            v-if="auth.isLogin"
          >
            <img :src="auth.image" class="nav-profile-image" />
            <span>{{ auth.name }}</span>
          </router-link>
          <button
              class="nav-link mx-4 button is-primary navbar-item"
              aria-current="page"
              v-if="auth.isLogin"
              @click="auth.logout"
            >
              <strong>تسجيل خروج</strong>
            </button>
          <div class="buttons">
            <router-link
              class="nav-link mx-4 button is-primary"
              aria-current="page"
              to="/register"
              v-if="!auth.isLogin"
              ><strong>عمل حساب</strong>
            </router-link>
            <router-link
              class="button is-light"
              aria-current="page"
              to="/login"
              v-if="!auth.isLogin"
              >تسجيل الدخول</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import type { HtmlHTMLAttributes } from "@vue/runtime-dom";
import { useAuthStore } from "@/stores/auth";
const auth = useAuthStore();
document.addEventListener("DOMContentLoaded", () => {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach((el) => {
      el.addEventListener("click", () => {
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target: any = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle("is-active");
        $target.classList.toggle("is-active");
      });
    });
  }
});
</script>
<style scoped>
.navbar-end {
  width: 100%;
}
.navbar-item img {
  max-height: none !important;
}

.nav-profile {
  display: flex;
  align-items: center;
}
.nav-profile-image {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.navbar-dropdown {
  z-index: 99999 !important;
  width: 220px;
}
</style>
