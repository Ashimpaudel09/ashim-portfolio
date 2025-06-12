import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()
  ],
   hmr: {
      host: '192.168.0.4',
      protocol: 'ws',    // your actual IP
      port: 5173,
    },
   server: {
        host: '0.0.0.0',
    proxy: {
      '/api': 'https://ashim-portfolio-backend.onrender.com',
    }},
})
