import type { Route } from "./+types/product-slug";
import type { Product } from "~/modules/product/type";
import { Button } from "~/components/ui/button";
import { parseHtmlToReact } from "~/lib/html";
import { convertCurrencyToIDR } from "~/lib/currency";

export function meta({ params }: Route.MetaArgs) {
  const productName = params.slug?.replace(/-/g, " ") || "CerDiQ Food Product";
  return [
    { title: `Cerdiq Food – ${productName}` },
    {
      name: "description",
      content:
        "Produk pilihan dari Cerdiq Food – segar, sehat, halal, dan praktis!",
    },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const response = await fetch(
    `${process.env.BACKEND_API_URL}/products/${params.slug}`
  );
  const product: Product = await response.json();
  return product;
}

export default function ProductSlug({ loaderData }: Route.ComponentProps) {
  const product = loaderData;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row bg-white shadow-md rounded-xl overflow-hidden">
        <div className="w-full md:w-1/2 aspect-square">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-80 object-cover rounded-md"
          />
        </div>

        <div className="w-full md:w-1/2 p-6">
          <h2 className="text-2xl font-bold text-[#E63946] mb-3">
            {product.name}
          </h2>

          <p className="text-gray-600 mb-4 leading-relaxed">
            {product.description
              ? parseHtmlToReact(product.description)
              : "Deskripsi produk tidak tersedia."}
          </p>

          <p className="text-xl font-bold text-green-600 mb-6">
            {convertCurrencyToIDR(product.price)}
          </p>

          <button className="px-6 py-2 bg-[#E63946] text-white rounded-lg hover:bg-red-700 transition">
            Pesan Sekarang
          </button>
        </div>
      </div>
    </div>
  );
}
