import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  resolve: {
    alias: {
      'styled-components': 'styled-components/dist/styled-components.cjs',
    },
  },
})
