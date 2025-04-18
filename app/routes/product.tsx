import type { Product } from "../modules/product/type";
import type { Route } from "./+types/product";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Product | Cerdiq Food" },
    {
      name: "description",
      content:
        "Buy fresh vegetables and homemade frozen food from our own garden and kitchen.",
    },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const baseUrl = process.env.BACKEND_API_URL || "";
  const slug = params.slug;

  const response = await fetch(`${baseUrl}/products/${slug}`);
  const product: Product = await response.json();

  return product;
}

export default function Product({ loaderData }: Route.ComponentProps) {
  const product = loaderData;

  return (
    <div>
      <h1>{product.name}</h1>
      <img
        src={product.imageUrl}
        alt={product.name}
        className="size-40 object-cover"
      />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Weight: {product.weight} kg</p>
      <p>Stock Quantity: {product.srockQuantity}</p>
      <p>Is Organic: {product.isOrganic ? "Yes" : "No"}</p>
    </div>
  );
}
