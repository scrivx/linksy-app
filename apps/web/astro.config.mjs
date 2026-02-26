// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },
  env: {
    schema: {
      PUBLIC_API_URL: import.meta.env.PUBLIC_API_URL || 'http://localhost:3000',
    }
  }
});