// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

const siteTarget = process.env.SITE || "dental"; // valor por defecto

// https://astro.build/config
export default defineConfig({
  outDir: `dist/${siteTarget}`,
  vite: {
    plugins: [tailwindcss()],
  },
});
