import type { Config } from "@react-router/dev/config";

export default {
  ssr: false,
  appDirectory: "app/frontend/framework",
  basename: "/app",
  buildDirectory: "build",
} satisfies Config;
