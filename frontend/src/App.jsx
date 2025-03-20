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
import TravelPackages  from "./pages/TravelPackages ";
import PaymentPage from "./pages/paymentPage";
import CreateTravelPackage from "./pages/CreateTravelPackage";
import TravelPackageDetails from "./pages/TravelPackageDetails";

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
        <Route path="/" element={<LoginPage />} />
        <Route path="/usercart" element={<CartPage />} />
        <Route path="/userrental" element={<RentalPage />} />
        <Route path="/rentform" element={<RentItemForm />} />
        <Route path="/rentcheckout" element={<RentedItemsPage />} />
        <Route path="/travelPackages" element={<TravelPackages />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/travelPackages/Create" element={<CreateTravelPackage />} />
        <Route path="/travelPackages/:id" element={<TravelPackageDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
