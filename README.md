# LandingPageWeb

产品落地页集合站：一个站点收录多个产品的落地页，首页是产品列表，每个产品一个独立落地页（`/p/<slug>/`）。

技术栈：Astro 5 + Tailwind CSS 4 + MDX 内容集合，构建产物为纯静态页面（默认零 JS，仅一小段滚动显现脚本）。

## 常用命令

```bash
npm install        # 安装依赖
npm run dev        # 本地开发 http://localhost:4321
npm run build      # 构建到 dist/
npm run preview    # 预览构建产物
```

## 新增一个产品（目标：30 分钟内完成）

1. **准备素材**，放进两个目录：
   - `src/assets/products/<slug>/`：页面内使用的图（会经 Astro 自动压缩为 webp）。至少需要产品图标和一张展示截图。
   - `public/products/<slug>/`：og:image 用图（不经压缩管线，建议 512px 以内）。
2. **新建内容文件** `src/content/products/<slug>.mdx`，参照 `minimal-todo.mdx` 填写 frontmatter：
   - 基本信息：`name` / `tagline` / `description` / `version` / `platform` / `links`（download、repo）
   - `status`：`draft` 的产品不参与构建；上线改为 `live`
   - `order`：首页排序，小的在前
   - `sections`：有序区块列表，`type` 决定用哪个组件渲染
3. `npm run dev` 查看效果，首页卡片自动出现，落地页路由 `/p/<slug>/` 自动生成。

**验收标准：新增产品不改动任何路由和组件代码，只新增内容文件与素材。**

## 区块类型（sections）

| type | 用途 | 组件 |
| --- | --- | --- |
| `hero` | 首屏：标题、简介、双 CTA、产品截图 | `src/components/sections/Hero.astro` |
| `showcase` | 全宽大图展示 | `Showcase.astro` |
| `features` | Bento 宫格功能点（icon 用 Phosphor 图标名） | `Features.astro` |
| `details` | 三列规格分组 | `Details.astro` |
| `faq` | 折叠问答 | `Faq.astro` |
| `download` | 底部转化区：CTA + 注意事项 | `DownloadCta.astro` |

字段的完整约束见 `src/content.config.ts`（Zod schema，填错字段会在构建时报错并提示）。

### 新增一种区块类型

1. 在 `src/content.config.ts` 的 `sections` discriminatedUnion 里加一个成员；
2. 在 `src/components/sections/` 下新建同名组件；
3. 在 `src/pages/p/[slug].astro` 的渲染链里注册该类型。

## 站点配置

- 站点名、描述、GitHub 链接：`src/lib/site.ts`
- 正式域名：`astro.config.mjs` 的 `site`（当前为 `https://example.com` 占位，影响 sitemap / canonical / og:url）与 `public/robots.txt`

## 约定与已知取舍

- 全站锁定深色主题（与应用深色 UI 一致）；`theme.surface: light` 字段已预留，暂未实现浅色渲染。
- 每个产品的强调色目前使用全局品牌蓝（`src/styles/global.css` 的 `--color-accent`）；`theme.accent` 字段已预留，后续可在 `[slug].astro` 里以 CSS 变量下发实现按产品换色。
- 中文人名、品牌与文案直接写在 MDX 里；长文可写在 MDX 正文（当前模板未渲染正文，需要时在页面尾部补一个渲染出口）。
- 图标只用 Phosphor（`@phosphor-icons/web`），名称查 https://phosphoricons.com 。
