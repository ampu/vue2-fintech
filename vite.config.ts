import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue2'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      vue: 'vue/dist/vue.common.dev.js',
    },
  },
  plugins: [
    vue(),
  ],
})
