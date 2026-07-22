// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://tibcert.org',
  integrations: [sitemap()],
  image: {
    domains: ["blog.tibcert.org"],
    service: passthroughImageService(),
  },
  vite: {
    plugins: [tailwindcss()]
  }
});