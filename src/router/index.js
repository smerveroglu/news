import { createRouter, createWebHistory } from "vue-router";
import News from "../views/components/News.vue";
import TopHeadlines from "../views/components/TopHeadlines.vue";


const routes = [
  // Routes
  {
    path: "/:newspaper",
    name: "News",
    component: News,
    meta: { title: "News " },
  },
  {
    path: "/",
    name: "TopHeadlines",
    component: TopHeadlines,
    meta: { title: "TopHeadlines " },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,

  linkExactActiveClass: "exact-active",
});


export default router;
