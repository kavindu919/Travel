import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation

const RentedItemsPage = () => {
  const [rentedItems, setRentedItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [userId, setUserId] = useState(null);

  // Get userId from URL query using useLocation
  const location = useLocation();
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("userId");
    setUserId(id);
  }, [location]);

  // Function to calculate the total price
  const calculateTotal = () => {
    let total = 0;
    rentedItems.forEach((item) => {
      item.products.forEach((product) => {
        if (product.Product && product.Product.price) {
          total += product.Product.price * product.quantity; // Include quantity if needed
        } else {
          console.warn("Product price or Product is missing", product);
        }
      });
    });
    setTotal(total);
  };

  // Fetch rented items from API
  useEffect(() => {
    if (userId) {
      const fetchRentedItems = async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/api/rentals/user/${userId}`
          );
          const data = await response.json();
          setRentedItems(data); // Set rented items data
          calculateTotal(); // Calculate total price after setting the rented items
        } catch (error) {
          console.error("Error fetching rented items", error);
        }
      };
      fetchRentedItems();
    }
  }, [userId]);

  // Delete rental
  const handleDeleteRental = async (rentalId) => {
    try {
      // Send delete request to the API using POST method with rentalId as URL parameter
      const response = await fetch(
        `http://localhost:3000/api/rentals/delete/${rentalId}`,
        {
          method: "POST", // Use POST method instead of DELETE
          headers: {
            "Content-Type": "application/json", // Set content type for body data
          },
        }
      );

      if (response.ok) {
        // Remove the deleted rental from the state
        setRentedItems((prevItems) =>
          prevItems.filter((rental) => rental.id !== rentalId)
        );
        calculateTotal(); // Recalculate total price after deletion
      } else {
        console.error("Error deleting rental");
      }
    } catch (error) {
      console.error("Error deleting rental", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-6 text-center">Rented Items</h1>

      <div className="overflow-x-auto">
        {/* Table for displaying rented items */}
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">
                Rental ID
              </th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">
                Product Name
              </th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">
                Price
              </th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">
                Quantity
              </th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">
                Total Price
              </th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">
                Status
              </th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Loop through rentedItems and display them in table rows */}
            {rentedItems.map((rental) =>
              rental.products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-4 px-6 text-sm text-gray-700">
                    {rental.id}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-700">
                    {product.Product.name}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-700">
                    ${product.Product.price}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-700">
                    {product.quantity}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-700">
                    ${(product.Product.price * product.quantity).toFixed(2)}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-700">
                    {rental.status}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-700">
                    <button
                      onClick={() => handleDeleteRental(rental.id)}
                      className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 focus:outline-none"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Display total price of all rented items */}
      <div className="mt-6 p-4 border-t border-gray-200">
        <h2 className="text-xl font-semibold text-right">
          Total Price: ${total.toFixed(2)}
        </h2>
      </div>
    </div>
  );
};

export default RentedItemsPage;
