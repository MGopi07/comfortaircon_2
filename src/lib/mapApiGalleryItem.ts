import { GalleryItem, GalleryCategory, GALLERY_CATEGORIES } from '@/types/gallery';

export { GALLERY_CATEGORIES };

/**
 * mapApiGalleryItem maps a raw backend API response item to the frontend GalleryItem model.
 *
 * Current status: Passthrough stub ready for backend API integration.
 *
 * When backend endpoints are integrated:
 * - Map database fields (e.g., photo_url -> image, description -> title)
 * - Validate or normalize category enum
 * - Filter or ensure published state
 */
export function mapApiGalleryItem(apiData: any): GalleryItem {
  if (!apiData) {
    throw new Error('mapApiGalleryItem: apiData cannot be null or undefined');
  }

  // Normalize category fallback
  const category: GalleryCategory = GALLERY_CATEGORIES.includes(apiData.category)
    ? apiData.category
    : 'Installation Photos';

  return {
    id: String(apiData.id || apiData._id || ''),
    image: apiData.image || apiData.imageUrl || apiData.photoUrl || '/images/carrier-vrf.png',
    alt: apiData.alt || apiData.title || 'Comfort Aircon Project Photo',
    category,
    title: apiData.title || apiData.caption || '',
  };
}

/**
 * Maps an array of raw API gallery items to GalleryItem[].
 */
export function mapApiGalleryItems(data: any[]): GalleryItem[] {
  if (!Array.isArray(data)) return [];
  return data.map(mapApiGalleryItem);
}
