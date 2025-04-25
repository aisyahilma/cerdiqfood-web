export type Product = {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  price: number;
  srockQuantity?: number | null;
  isOrganic?: boolean | null;
  weight: number;
  imageUrl: string;
  category?: string | null;
  createdAt: Date;
  updatedAt: Date;
};
