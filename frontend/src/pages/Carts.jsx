import React from "react";
import Sidebar from "../components/Sidebar";
import CartTable from "../components/CartTable";

const Carts = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Carts</h1>
        <CartTable />
      </div>
    </div>
  );
};

export default Carts;