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

export type Product = z.infer<typeof ProductSchema>;
export type Products = z.infer<typeof ProductsSchema>;

export const CartItemSchema = z.object({
  id: z.string(),
  quantity: z.number(),
  productId: z.string(),
  product: ProductSchema,
  cartId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export const CartSchema = z.object({
  id: z.string(),
  items: z.array(CartItemSchema),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export const AddCartItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().default(1),
});

export type Cart = z.infer<typeof CartSchema>;
export type CartItem = z.infer<typeof CartItemSchema>;
export type AddCartItem = z.infer<typeof AddCartItemSchema>;
