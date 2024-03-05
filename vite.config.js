import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  build: {
    outDir: "build",
  },
});
