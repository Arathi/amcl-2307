import { createApp } from "vue";
import "./styles.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import { getMatches } from "@tauri-apps/api/cli";
import { exit } from "@tauri-apps/api/process";

getMatches().then(async (matches) => {
  console.info("[matches]: ", matches);
  // await exit(0);
});

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.mount("#app");
