import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'CRUD App',
  description: 'A simple app for CRUD operations',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex h-screen">
          {/* Side Nav */}
          <nav className="w-64 bg-gray-800 text-white p-6">
            <h2 className="text-2xl font-bold mb-6">Menu</h2>
            <ul className="space-y-4">
              <li>
                <Link href="/products/create" className="hover:text-gray-300">
                  Create Product
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-gray-300">
                  View Products
                </Link>
              </li>
              <li>
                <Link href="/products/update" className="hover:text-gray-300">
                  Update Product
                </Link>
              </li>
              <li>
                <Link href="/products/delete" className="hover:text-gray-300">
                  Delete Product
                </Link>
              </li>
            </ul>
          </nav>

          {/* Main Content */}
          <main className="flex-1 p-6 overflow-y-auto bg-gray-100">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
