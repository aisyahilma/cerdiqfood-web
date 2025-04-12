import { log } from "console";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Cerdiq Food" },
    {
      name: "description",
      content:
        "Web E-commerce web application for **CerDiQ Food**, a platform inspired by Sayurbox to sell fresh vegetables and homemade frozen food from our own garden and kitchen.",
    },
  ];
}

type Product = {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  price: number;
  srockQuantity?: number | null;
  isOrganic?: boolean | null;
  weight: number;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
};

type Products = Product[];

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const response = await fetch(`http://localhost:3000/products`);
  const products = (Products = await response.json());
  return products;
}

export function HydrateFallback() {
  return <div>Loading products...</div>;
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const products = loaderData;

  console.log({ products });

  return (
    <div>
      <h1>Cerdiq Food</h1>
    </div>
  );
}
