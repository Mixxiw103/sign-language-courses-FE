import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  theme: {
    extend: {
      colors: {
          primary: "#4F46E5",   
          dark: "#3730a3",      
          light: "#a5b4fc",     
          text:"#475569",
        },
    },
  },
})
