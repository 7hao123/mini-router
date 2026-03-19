import { h } from "vue";
import { createRouter, createWebHistory } from "@/vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import MyView from "../views/MyView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    beforeEnter() {
      console.log("进入前");
    },
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/my",
    name: "My",
    component: MyView,
    children: [
      {
        path: "a",
        name: "MyA",
        component: { render: () => h("a", "a页面") },
      },
      {
        path: "b",
        name: "MyB",
        component: { render: () => h("a", "b页面") },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
