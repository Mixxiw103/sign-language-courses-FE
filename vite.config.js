import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from "node:url";

// https://vite.dev/config/
export default defineConfig({
<<<<<<< HEAD
  plugins: [react(), tailwindcss()],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",
        dark: "#3730a3",
        light: "#a5b4fc",
        textColor: "#475569",
      },
=======
  plugins: [react(),tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
>>>>>>> da34e787d858c11122626d09f6744c0e07e0ec78
    },
  },
  
})
