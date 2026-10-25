// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://getassist.pro',
  output: 'static',
  // One URL form: no trailing slash. nginx 301s "/page/" and "/page.html" to "/page".
  trailingSlash: 'never',
  build: {
    format: 'file',
    // Keeps CSS in external files so the CSP needs no 'unsafe-inline'.
    inlineStylesheets: 'never',
  },
  // Prefetch would inject a client script; the site ships no JavaScript.
  prefetch: false,
  devToolbar: { enabled: false },
  i18n: {
    // English only at launch; structure is ready for more locales.
    locales: ['en'],
    defaultLocale: 'en',
  },
  integrations: [sitemap({ filter: (page) => !page.includes('/404') })],
  vite: {
    plugins: [tailwindcss()],
    build: {
      // Never turn small assets into data: URIs inside CSS/JS.
      assetsInlineLimit: 0,
    },
  },
});
