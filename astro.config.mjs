// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    // TODO: 正式上线前替换为真实域名（影响 sitemap / canonical / og:url）
    site: 'https://example.com',
    integrations: [mdx(), sitemap()],
    vite: {
        plugins: [tailwindcss()],
    },
});
