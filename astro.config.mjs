// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages 项目页部署；绑定自定义域名时：
// site 改为真实域名，删除 base（例如 site: 'https://landing.example.com'）
export default defineConfig({
    site: 'https://handsometaoa.github.io',
    base: '/landing-pages',
    trailingSlash: 'ignore',
    integrations: [mdx(), sitemap()],
    vite: {
        plugins: [tailwindcss()],
    },
});
