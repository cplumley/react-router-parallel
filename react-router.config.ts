import type { Config } from "@react-router/dev/config";

export default {
  ssr: false,
  appDirectory: "app/frontend/spa",
  basename: "/app",
  buildDirectory: "build",
} satisfies Config;
