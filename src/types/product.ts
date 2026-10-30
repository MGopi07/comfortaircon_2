/**
 * Product domain type definition.
 * Strictly aligns with the 6 backend admin panel fields and API response:
 * 1. Image
 * 2. Name
 * 3. Model
 * 4. Specifications
 * 5. Features
 * 6. Enquire Action
 */
export type ProductSpecification = {
  label: string;
  value: string;
};

export type Product = {
  id: string;
  image: string;
  name: string;
  model: string;
  specifications: ProductSpecification[];
  features: string[];
};
