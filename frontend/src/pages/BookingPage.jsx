import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { travelPackage, user } = location.state || {};
  const [formData, setFormData] = useState({
    travelDate: "",
    numTravelers: 1,
    specialRequest: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("userId");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); 
    try {
      const response = await axios.post("http://localhost:3000/api/bookings", {
        userId: userId, // Assuming user object has id
        packageId: travelPackage.id,
        travelDate: formData.travelDate,
        numTravelers: formData.numTravelers,
        specialRequest: formData.specialRequest,
      });

      alert("Booking Successful!");
      navigate("/confirmation"); // Redirect to a confirmation page
    } catch (error) {
      console.error("Error during booking:", error);
      setError("There was an issue with your booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
        Booking for {travelPackage?.name}
      </h1>
      <div className="mb-6">
        <p><strong>Package Name:</strong> {travelPackage?.name}</p>
        <p><strong>Price:</strong> ${travelPackage?.price}</p>
        <p><strong>Destination:</strong> {travelPackage?.destination}</p>
      </div>

      {/* Display error if any */}
      {error && (
        <div className="bg-red-500 text-white p-4 rounded-lg mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-lg font-semibold">Travel Date</label>
          <input
            type="date"
            name="travelDate"
            value={formData.travelDate}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-semibold">Number of Travelers</label>
          <input
            type="number"
            name="numTravelers"
            min="1"
            value={formData.numTravelers}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-semibold">Special Requests</label>
          <textarea
            name="specialRequest"
            value={formData.specialRequest}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
          ></textarea>
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={loading}
            className={`${
              loading ? "bg-gray-400" : "bg-green-600"
            } text-white py-3 px-6 rounded-lg hover:bg-green-700 transition duration-300`}
          >
            {loading ? "Processing..." : "Confirm Booking"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingPage;
