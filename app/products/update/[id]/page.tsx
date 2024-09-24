"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";

interface Category {
  _id: string; // Category ID
  name: string; // Category name
  description: string; // Optional
}

const UpdateProductPage = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<string>(""); // Store category ID
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { id } = useParams();

  // Fetch the product data by ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        const product = res.data;
        setName(product.name);
        setPrice(product.price);
        setDescription(product.description);
        setCategory(product.category); // Set the selected category ID
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/categories");
        console.log(res.data); // Check the data structure
        setCategories(res.data); // Set categories array
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Handle form submission for updating product
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/products/${id}`, {
        name,
        price,
        description,
        category, // This will now contain the selected category ID
      });
      router.push("/products"); // Redirect to products page after updating
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  if (loading) {
    return <div>Loading product details...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Update Product</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="border p-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Category</label>
          <select
            value={category} // Set selected value to category state
            onChange={(e) => setCategory(e.target.value)} // Update category state on change
            className="border p-2 w-full"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {" "}
                {/* Use category ID as value */}
                {cat.name} {/* Display category name */}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="bg-blue-500 text-white py-2 px-4">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProductPage;
