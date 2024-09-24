"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: { name: string };
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Handle del
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Navigate to update page
  const handleUpdate = (id: string) => {
    router.push(`/products/update/${id}`);
  };

  if (loading) {
    return <div>Loading products...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <ul className="space-y-4">
        {products.map((product) => (
          <li key={product._id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p>Price: ${product.price}</p>
            <p>{product.description}</p>
            <p>Category: {product.category.name}</p>

            <div className="flex space-x-4 mt-4">
              <button
                onClick={() => handleUpdate(product._id)}
                className="bg-yellow-500 text-white py-1 px-4 rounded"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className="bg-red-500 text-white py-1 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsPage;
