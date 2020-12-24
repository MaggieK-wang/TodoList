import Vue from "vue";
import VueRouter from "vue-router";
import TodoLsit from "../views/TodoLsit"

Vue.use(VueRouter);

const routes = [
  // {
  //       path: "/",
  //       name: "Login",
  //       component: Login,
  //   },
  {
    path: "/",
    name: "TodoLsit",
    component: TodoLsit,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;