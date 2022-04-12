import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/blood",
      name: "blood",
      component: () => import("../views/BloodView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/RegisterView.vue"),
    },
    {
      path: "/dashborad",
      name: "dashborad",
      component: () => import("../views/DashboradView.vue"),
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("../views/Profileview.vue"),
    },
  ],
});

export default router;
