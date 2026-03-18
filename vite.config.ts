import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dns from "dns";
// https://vitejs.dev/config/server-options.html#server-options
dns.setDefaultResultOrder("verbatim");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes("node_modules/antd") ||
            id.includes("node_modules/@ant-design")
          ) {
            return "vendor-antd";
          }

          if (
            id.includes("node_modules/react-router") ||
            id.includes("node_modules/react-router-dom")
          ) {
            return "vendor-router";
          }

          if (
            id.includes("node_modules/react") ||
            id.includes("node_modules/react-dom")
          ) {
            return "vendor-react";
          }

          if (id.includes("node_modules/axios")) {
            return "vendor-axios";
          }
        },
      },
    },
  },
});
