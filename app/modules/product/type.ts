import { z } from "zod";

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable().optional(),
  price: z.number(),
  stockQuantity: z.number().nullable().optional(),
  isOrganic: z.boolean().nullable().optional(),
  weight: z.number(),
  imageUrl: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const ProductsSchema = z.array(ProductSchema);

export const CreateProductSchema = ProductSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  slug: z.string().optional(), // slug opsional saat create
});

export const CreateProductsSchema = z.array(CreateProductSchema);

// Untuk typescript types
export type Product = z.infer<typeof ProductSchema>;
export type Products = Product[];
