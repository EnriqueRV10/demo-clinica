// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

const siteType = process.env.SITE_TYPE || "dental";

// https://astro.build/config
export default defineConfig({
  output: "static",
  site:
    siteType === "dental"
      ? "https://dental-demo.netlify.app"
      : "https://fisio-demo.netlify.app",
  base: "/",
  build: {
    format: "directory",
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
