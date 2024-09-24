"use client";

import { useState } from "react";
import axios from "axios";

const DeleteProductPage = () => {
  const [productId, setProductId] = useState("");

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.delete(`http://localhost:5000/api/products/${productId}`);
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Delete a Product</h1>
      <form onSubmit={handleDelete} className="space-y-4">
        <div>
          <label className="block mb-2">Product ID</label>
          <input
            type="text"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <button type="submit" className="bg-red-500 text-white py-2 px-4">
          Delete Product
        </button>
      </form>
    </div>
  );
};

export default DeleteProductPage;
