import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiTrash2 } from "react-icons/fi";

const ProductTable = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await axios.get("http://localhost:3000/api/products");
    setProducts(response.data);
  };

  const deleteProduct = async (id) => {
    try {
      await axios.post(`http://localhost:3000/api/products/delete/${id}`);
    } catch (error) {
      console.log(error);
    }
    fetchProducts();
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg w-full h-screen mx-auto">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        Product Management
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Price</th>
              <th className="py-3 px-6 text-left">Stock</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b border-gray-200 hover:bg-gray-50 transition"
              >
                <td className="py-3 px-6">{product.id}</td>
                <td className="py-3 px-6">{product.name}</td>
                <td className="py-3 px-6">${product.price}</td>
                <td className="py-3 px-6">{product.stock}</td>
                <td className="py-3 px-6 flex justify-center gap-3">
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md shadow cursor-pointer"
                  >
                    <FiTrash2 className="text-lg" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
