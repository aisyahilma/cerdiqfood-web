import type { Route } from "./+types/home";
import type { Products } from "~/modules/product/type";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Cerdiq Food" },
    {
      name: "description",
      content:
        "Buy fresh vegetables and homemade frozen food from our own garden and kitchen.",
    },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const response = await fetch(`${process.env.BACKEND_API_URL}/products`);
  const products: Products = await response.json();
  return products;
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const products = loaderData;

  return (
    <div>
      <h1>Cerdiq Food</h1>
      <ul>
        {products.map((product) => {
          return (
            <li key={product.id}>
              <img
                src={product.imageUrl}
                alt={product.name}
                className="size-40 object-cover"
              />
              <h2>{product.name}</h2>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
