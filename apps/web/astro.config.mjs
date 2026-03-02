// @ts-check
import { defineConfig, envField } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()]
  },
  env: {
    schema: {
      PUBLIC_API_URL: envField.string({
        context: 'client',
        access: 'public',
        default: 'http://localhost:3000',
      }),
    }
  }
});