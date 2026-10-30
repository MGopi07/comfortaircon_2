/**
 * Gallery domain types and constants.
 * Aligns with the backend admin panel schema and future API response.
 */

export const GALLERY_CATEGORIES = [
  'Installation Photos',
  'Completed Projects',
  'Service Work',
  'Product Images',
] as const;

export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number];

export type GalleryItem = {
  id: string;
  image: string;
  alt: string;
  category: GalleryCategory;
  title?: string; // optional caption / headline
};
