import express from "express";
import {
  addToCart,
  getCartItems,
  removeCartItem,
} from "../controllers/cartController.js";

const router = express.Router();

router.post("/cart", addToCart);
router.get("/cart/:userId", getCartItems);
router.delete("/cart/:id", removeCartItem);

export default router;
