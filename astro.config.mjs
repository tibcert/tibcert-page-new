// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  image: {
    domains: ["blog.tibcert.org"],
    service: passthroughImageService(),
  },
  vite: {
    plugins: [tailwindcss()]
  }
});