/**
 * 站点级配置：集合站自身的品牌信息。
 * 产品信息不在这里，每个产品一个 src/content/products/<slug>.mdx。
 */

/** 当前部署的 base 路径（GitHub Pages 项目页为 '/LandingPageWeb/'，自定义域名部署时为 '/'） */
export const BASE_URL: string = import.meta.env.BASE_URL;

/** 给站内绝对路径加上 base 前缀：withBase('/p/x/') → '/LandingPageWeb/p/x/' */
export function withBase(path: string): string {
    return BASE_URL.replace(/\/$/, '') + path;
}

export const site = {
    name: 'handsometaoa',
    tagline: '独立开发的小工具，落地页都收在这里',
    description:
        'handsometaoa 的产品集合：独立开发的桌面与效率工具，每个产品一个落地页，集中收录与更新。',
    github: 'https://github.com/handsometaoa',
} as const;
