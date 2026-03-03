import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/app/",
  publicDir: false,
  plugins: [tailwindcss(), reactRouter()],
  cacheDir: "node_modules/.vite-rr",
});
