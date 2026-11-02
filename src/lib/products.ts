import type { ImageMetadata } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';

/** 产品素材图注册表：key 为 "<slug>/<文件名>"，值是构建期优化的图片元数据 */
const imageFiles = import.meta.glob<{ default: ImageMetadata }>(
    '../assets/products/**/*.{png,jpg,jpeg,webp,avif}',
    { eager: true }
);

const imageMap = new Map<string, ImageMetadata>();
for (const [path, mod] of Object.entries(imageFiles)) {
    const key = path.split('/assets/products/')[1]!;
    imageMap.set(key.toLowerCase(), mod.default);
}

/** 按产品 slug + 文件名取素材图；缺失时直接报错，避免上线时静默裂图 */
export function productImage(slug: string, name: string): ImageMetadata {
    const img = imageMap.get(`${slug}/${name.toLowerCase()}`);
    if (!img) {
        throw new Error(
            `[products] 找不到素材图 ${slug}/${name}，请放到 src/assets/products/${slug}/ 下`
        );
    }
    return img;
}

/** 上线状态的产品，按 order 升序 */
export async function getLiveProducts(): Promise<CollectionEntry<'products'>[]> {
    const all = await getCollection('products');
    return all
        .filter((p) => p.data.status === 'live')
        .sort((a, b) => a.data.order - b.data.order);
}

export function productPath(slug: string): string {
    return `/p/${slug}/`;
}
