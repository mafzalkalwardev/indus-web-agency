/** Real product media paths under /public/images/products/{slug}/ */

export function productMedia(slug: string, file: string): string {
  return `/images/products/${slug}/${file}`;
}

export function productGallery(slug: string, files: string[]): string[] {
  return files.map((file) => productMedia(slug, file));
}
