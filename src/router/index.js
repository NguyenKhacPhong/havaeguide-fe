import { createRouter, createWebHistory } from "vue-router";
import client from "./client.js";
import auth from "./auth.js";
const routes = [...client, ...auth];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
      return { top: 0, left: 0 };
    },
  });

export default router;