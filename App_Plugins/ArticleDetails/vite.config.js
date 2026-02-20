import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/article-details.js",
      formats: ["es"],
      fileName: () => "article-details.js",
    },
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      external: [/^@umbraco/],
    },
  },
  base: "/App_Plugins/ArticleDetails/dist/",
});