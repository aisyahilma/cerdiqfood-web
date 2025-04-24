import { Link, Outlet } from "react-router";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <header className="bg-[#E63946] text-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="CerDiQ Food" className="h-8 w-auto" />
              <h1 className="text-2xl font-bold">CerDiQ Food</h1>
            </Link>

            <div className="flex-1 max-w-md w-full">
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search fresh or frozen products..."
                  className="w-full px-4 py-2 bg-white text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E63946] placeholder-gray-500"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[#E63946] hover:text-red-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <nav>
              <ul className="flex items-center gap-6">
                <li>
                  <Link to="/" className="hover:underline hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products"
                    className="hover:underline hover:text-white"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="hover:underline hover:text-white"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="hover:underline hover:text-white"
                  >
                    Register
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    className="hover:underline hover:text-white"
                  >
                    Login
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>

      <footer className="bg-gray-100 text-center text-sm text-gray-600 py-6">
        <div className="container mx-auto px-4">
          <p>
            &copy; {new Date().getFullYear()} CerDiQ Food. Fresh Greens & Frozen
            Delights.
          </p>
        </div>
      </footer>
    </div>
  );
}
