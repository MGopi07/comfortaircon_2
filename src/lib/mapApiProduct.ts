import { Product } from '@/types/product';

/**
 * mapApiProduct maps raw backend API response objects to the frontend Product type.
 *
 * Directly maps the 6 fields managed from the admin panel:
 * 1. image
 * 2. name
 * 3. model
 * 4. specifications
 * 5. features
 * 6. enquire button / specs action
 */
export function mapApiProduct(apiData: any): Product {
  if (!apiData) {
    throw new Error('mapApiProduct: apiData cannot be null or undefined');
  }

  return {
    id: String(apiData.id || apiData._id || ''),
    image: apiData.image || apiData.imageUrl || '/images/carrier-split-ac.png',
    name: apiData.name || apiData.title || 'Air Conditioner',
    model: apiData.model || apiData.modelCode || '',
    specifications: Array.isArray(apiData.specifications)
      ? apiData.specifications
      : Array.isArray(apiData.specsList)
      ? apiData.specsList
      : [],
    features: Array.isArray(apiData.features)
      ? apiData.features
      : Array.isArray(apiData.featuresList)
      ? apiData.featuresList
      : [],
  };
}

/**
 * Maps an array of raw API products to Product[].
 */
export function mapApiProducts(data: any[]): Product[] {
  if (!Array.isArray(data)) return [];
  return data.map(mapApiProduct);
}
