import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig(({ command }) => ({
  base: command === "build" ? "/app/" : undefined,
  plugins: [tailwindcss(), reactRouter()],
  cacheDir: "node_modules/.vite-rr",
}));
