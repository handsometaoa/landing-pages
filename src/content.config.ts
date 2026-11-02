import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * 产品集合 schema
 *
 * 新增一个产品 = 新增一个 src/content/products/<slug>.mdx + src/assets/products/<slug>/ 素材目录。
 * sections 是有序的区块列表，每个区块用 type 区分，页面按顺序渲染对应组件。
 * 需要新区块类型时：在这里加一个 union 成员，再在 src/components/sections/ 加同名组件，页面渲染器里注册即可。
 */

const cta = z.object({
    label: z.string(),
    href: z.string(),
    /** 站外链接（新窗口打开） */
    external: z.boolean().default(false),
});

const products = defineCollection({
    loader: glob({ pattern: '*.mdx', base: './src/content/products' }),
    schema: z.object({
        name: z.string(),
        tagline: z.string(),
        /** 列表页卡片与 <meta description> 用的产品简介，一两句话 */
        description: z.string(),
        /** draft 不参与构建；live 正常展示 */
        status: z.enum(['draft', 'live', 'archived']).default('draft'),
        /** 首页排序，小的在前 */
        order: z.number().default(100),
        version: z.string().optional(),
        platform: z.array(z.string()).default([]),
        theme: z
            .object({
                /** 品牌强调色，#RRGGBB */
                accent: z
                    .string()
                    .regex(/^#[0-9a-fA-F]{6}$/)
                    .default('#4d8dff'),
                /** 页面明暗基调（当前站点为深色，light 预留给后续产品） */
                surface: z.enum(['light', 'dark']).default('dark'),
            })
            .default({}),
        links: z
            .object({
                download: z.string().optional(),
                repo: z.string().optional(),
            })
            .default({}),
        /** 产品图标文件名，位于 src/assets/products/<slug>/ 下 */
        icon: z.string().optional(),
        /** og:image 文件名，位于 public/products/<slug>/ 下 */
        ogImage: z.string().optional(),
        sections: z
            .array(
                z.discriminatedUnion('type', [
                    z.object({
                        type: z.literal('hero'),
                        headline: z.string(),
                        sub: z.string(),
                        primaryCta: cta,
                        secondaryCta: cta.optional(),
                        /** 展示图文件名（src/assets/products/<slug>/ 下） */
                        image: z.string(),
                    }),
                    z.object({
                        type: z.literal('showcase'),
                        title: z.string(),
                        caption: z.string().optional(),
                        image: z.string(),
                        alt: z.string().optional(),
                    }),
                    z.object({
                        type: z.literal('features'),
                        title: z.string(),
                        items: z.array(
                            z.object({
                                /** Phosphor 图标名（https://phosphoricons.com），如 list-checks */
                                icon: z.string().default('sparkle'),
                                title: z.string(),
                                desc: z.string(),
                                /** 该单元格使用品牌色渐变底，一屏内最多两三格 */
                                tint: z.boolean().default(false),
                            })
                        ),
                    }),
                    z.object({
                        type: z.literal('details'),
                        title: z.string(),
                        groups: z.array(
                            z.object({
                                heading: z.string(),
                                items: z.array(
                                    z.object({
                                        label: z.string(),
                                        value: z.string(),
                                    })
                                ),
                            })
                        ),
                    }),
                    z.object({
                        type: z.literal('faq'),
                        title: z.string().default('常见问题'),
                        items: z.array(
                            z.object({
                                q: z.string(),
                                a: z.string(),
                            })
                        ),
                    }),
                    z.object({
                        type: z.literal('download'),
                        title: z.string(),
                        sub: z.string().optional(),
                        primaryCta: cta,
                        secondaryCta: cta.optional(),
                        notes: z.array(z.string()).default([]),
                    }),
                ])
            )
            .default([]),
    }),
});

export const collections = { products };
