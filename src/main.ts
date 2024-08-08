import { createApp } from "vue";
import App from "./App.vue";
import router from "@/config/router/index";
import PrimeVue from "primevue/config";
import Noir from "@/config/primeVue/index";
import pinia from "@/config/pinia/index";
import "primeicons/primeicons.css";
import ToastService from "primevue/toastservice";

const app = createApp(App);

app.use(pinia); //use pinia
app.use(router); //use router
app.use(PrimeVue, {
  theme: {
    preset: Noir,
  },
});
app.use(ToastService);
app.mount("#app");
