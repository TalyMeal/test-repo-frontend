import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

export default defineConfig({
  plugins: [solid()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "../styles/variables.scss";`,
      }
    }
  },
  server: {
    port: 5173,
  },
  build: {
    target: 'esnext',
  },
})
