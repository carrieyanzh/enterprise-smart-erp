import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// You must use an arrow function here so Vite can pass the 'mode' argument
export default defineConfig(({ mode }) => {
  
  // This line safely creates the 'env' variable
  const env = loadEnv(mode, process.cwd(), '') 
  
  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          // Now env.BACKEND_URL will be safely read from your .env.local file
          target: env.BACKEND_URL || 'http://localhost:5000', 
          changeOrigin: true,
          secure: false,
        },
      },
    },
  }
})
