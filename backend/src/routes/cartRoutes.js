import express from "express";
import {
  addToCart,
  getCartItems,
  removeCartItem,
  completeOrder,
} from "../controllers/cartController.js";

const router = express.Router();

router.post("/cart", addToCart);
router.get("/cart/:userId", getCartItems);
router.delete("/cart/:id", removeCartItem);
router.put("/cart/complete-order/:userId", completeOrder);

export default router;
