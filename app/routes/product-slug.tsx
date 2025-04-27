import type { Route } from "./+types/product-slug";
import type { Product } from "~/modules/product/type";
import { parseHtmlToReact } from "~/lib/html";
import { Form, redirect } from "react-router";
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

  // Check if the form submission came from the "Pesan Sekarang" button
  const referer = request.headers.get("Referer");
  const isCheckout = formData.get("action") === "checkout";

  if (isCheckout) {
    return redirect("/cart");
  }
  return redirect(`/products/${formData.get("productSlug")}`);
}

export default function ProductSlug({ loaderData }: Route.ComponentProps) {
  const product = loaderData;

  return (
    <div className="flex-grow container mx-auto m-4 p-4">
      <div className="flex bg-card rounded-lg overflow-hidden gap-4">
        <div className="aspect-square">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h1 className="text-xl font-semibold mb-2 dark:text-white">
            {product.name}
          </h1>
          <p className="prose text-gray-600 dark:text-gray-300 mb-4">
            {parseHtmlToReact(product.description)}
          </p>

          <p className="text-lg font-black text-green-600 p-4">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
            }).format(product.price)}
          </p>

          <p className="text-sm text-gray-600 dark:text-gray-300">
            {product.stockQuantity && product.stockQuantity > 0
              ? `Stock: ${product.stockQuantity}`
              : "Stock: Out of stock"}
          </p>

          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            {product.isOrganic ? "Organic Product" : "Not Organic"}
          </p>

          <div className="flex flex-col gap-4">
            <Form method="post" className="flex flex-col gap-4">
              <input type="hidden" name="productId" value={product.id} />
              <input type="hidden" name="productSlug" value={product.slug} />

              <div className="flex items-center gap-4">
                <label htmlFor="quantity" className="text-sm font-medium">
                  Kuantitas:
                </label>
                <input
                  id="quantity"
                  type="number"
                  name="quantity"
                  defaultValue={1}
                  min={1}
                  max={product.stockQuantity ?? 1} // default 1 kalau stockQuantity null
                />
              </div>

              <div className="flex gap-4">
                <Button
                  type="submit"
                  className="flex-1 h-11 bg-[#E63946] text-white hover:bg-[#F25A5A] transition duration-200"
                >
                  Tambah ke Keranjang
                </Button>
                <Button
                  type="submit"
                  name="action"
                  value="checkout"
                  className="flex-1 h-11 bg-green-600 text-white hover:bg-green-500 transition duration-200"
                >
                  Pesan Sekarang
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
