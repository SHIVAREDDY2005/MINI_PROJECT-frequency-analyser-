import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  base: "/MINI_PROJECT-frequency-analyser-/", // MUST match repo name
});
