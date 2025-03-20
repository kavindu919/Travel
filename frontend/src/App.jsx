import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Users from "./pages/Users";
import Products from "./pages/Products";
import Carts from "./pages/Carts";
import Rentals from "./pages/Rentals";
import ProductPage from "./pages/ProductPage";
import AddToCartPage from "./pages/AddToCartPage";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";
import RentalPage from "./pages/RentalPage";
import RentItemForm from "./pages/RentItemForm";
import RentedItemsPage from "./pages/RentedItemsPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/products" element={<Products />} />
        <Route path="/carts" element={<Carts />} />
        <Route path="/rentals" element={<Rentals />} />
        <Route path="/userproducts" element={<ProductPage />} />
        <Route path="/addtocart" element={<AddToCartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/usercart" element={<CartPage />} />
        <Route path="/userrental" element={<RentalPage />} />
        <Route path="/rentform" element={<RentItemForm />} />
        <Route path="/rentcheckout" element={<RentedItemsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
