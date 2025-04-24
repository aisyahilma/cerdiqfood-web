import type { Products } from "~/modules/product/type";
import type { Route } from "./+types/home";
import { parseHtmlToReact } from "~/lib/html";
import { Link } from "react-router";
import { convertCurrencyToIDR } from "~/lib/currency";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "CerDiQ Food – Fresh & Frozen Products" },
    {
      name: "description",
      content:
        "Belanja makanan sehat, segar, dan beku langsung dari Dapur CerDiQ. Terjamin halal, praktis, dan nikmat!",
    },
  ];
}

export async function loader({}: Route.LoaderArgs) {
  const response = await fetch(`${process.env.BACKEND_API_URL}/products`);
  const products: Products = await response.json();
  return products;
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const products = loaderData;

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-[#E63946] mb-2">
          CerDiQ Food
        </h1>
        <p className="text-gray-600">
          Fresh Greens & Frozen Delights – langsung dari Dapur CerDiQ ke rumah
          kakak!
        </p>
      </section>

      {products.length === 0 ? (
        <div className="text-center text-gray-500">
          <p>Belum ada produk tersedia. Silakan cek kembali nanti.</p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <li key={product.id}>
              <Link to={`/products/${product.slug}`}>
                <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-lg font-semibold text-gray-800 mb-1">
                      {product.name}
                    </h2>

                    {product.category && (
                      <span className="text-xs inline-block bg-[#E63946] text-white px-2 py-1 rounded-full mb-2">
                        {product.category}
                      </span>
                    )}

                    <p className="text-sm text-gray-600 mb-3">
                      {parseHtmlToReact(
                        product.description?.substring(0, 80).concat("...")
                      )}
                    </p>
                    <p className="text-lg font-bold text-green-600">
                      {convertCurrencyToIDR(product.price)}
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <section className="mt-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Belanja hemat & sehat
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          CerDiQ Food menyediakan berbagai pilihan makanan sehat dan beku
          seperti bakso, sayur segar, ayam ungkep, dan lainnya. Cocok untuk
          kebutuhan rumah tangga, pondok, atau bisnis!
        </p>
        <Link
          to="/about"
          className="inline-block mt-4 px-6 py-2 bg-[#E63946] text-white rounded-lg hover:bg-red-700 transition"
        >
          Tentang CerDiQ Food
        </Link>
      </section>
    </div>
  );
}
