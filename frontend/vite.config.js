import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: process.env.PORT || 5173,
  },
  preview: {
    allowedHosts: ["gurucharan.onrender.com"], // Add your Render domain
  }
});