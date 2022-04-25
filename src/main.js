import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(fas);

const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon)
.use(router)
.use(store)
.mount("#app");

// router.beforeEach((to, from, next) => {
//   document.querySelector(".flex-sidebar").classList.add("hidden");
//   next();
// });
