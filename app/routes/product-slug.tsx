import type { Route } from "./+types/product-slug";
import type { Product } from "~/modules/product/type";
import { parseHtmlToReact } from "~/lib/html";
import { convertCurrencyToIDR } from "~/lib/currency";
import { Form, redirect } from "react-router";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { destroySession, getSession } from "~/sessions.server";
import type { AddCartItem } from "~/modules/cart/schema";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `CerDiQ Food – ${params.slug?.replace(/-/g, " ")}` },
    {
      name: "description",
      content:
        "Produk pilihan dari CerDiQ Food – segar, sehat, halal, dan praktis!",
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

export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  if (!session.has("token")) {
    return redirect("/login");
  }
  const token = session.get("token");

  const formData = await request.formData();

  const addCartItemData: AddCartItem = {
    productId: String(formData.get("productId")),
    quantity: Number(formData.get("quantity")),
  };

  const response = await fetch(`${process.env.BACKEND_API_URL}/cart/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(addCartItemData),
  });
  if (!response.ok) {
    session.flash("error", "Failed to add item to cart");
    return redirect("/login", {
      headers: { "Set-Cookie": await destroySession(session) },
    });
  }

  return redirect("/cart");
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
            {parseHtmlToReact(
              product.description?.substring(0, 150).concat("...")
            )}
          </p>

          <p className="text-xl font-bold text-green-600 mb-6">
            {convertCurrencyToIDR(product.price)}
          </p>

          <p className="text-md font-semibold mb-2">
            {product.stockQuantity
              ? `Stock: ${product.stockQuantity}`
              : "Stock: Out of stock"}
          </p>

          <p className="text-md font-semibold mb-2">
            {product.isOrganic ? "Organic Product" : "Not Organic"}
          </p>

          {/* Tombol menggunakan ShadCN UI */}
          <Button
            color="danger"
            onClick={() =>
              (window.location.href = "https://wa.me/your-whatsapp-number")
            } // Ganti dengan URL WhatsApp atau halaman pemesanan
            className="w-full md:w-auto"
          >
            Pesan Sekarang
          </Button>
        </div>
      </div>
    </div>
  );
}
