import prisma from "../lib/prismaClient.js";

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    let cart = await prisma.cart.findFirst({
      where: { userId },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
      });
    }

    const existingCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId: productId,
      },
    });

    if (existingCartItem) {
      const updatedCartItem = await prisma.cartItem.update({
        where: { id: existingCartItem.id },
        data: {
          quantity: existingCartItem.quantity + quantity,
        },
      });
      return res.status(200).json(updatedCartItem);
    }

    const cartItem = await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity,
      },
    });

    res.status(201).json(cartItem);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error adding item to cart" });
  }
};

// Get cart items
export const getCartItems = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await prisma.cart.findFirst({
      where: { userId },
      include: {
        products: {
          include: {
            Product: true,
          },
        },
      },
    });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    res.json(cart.products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching cart" });
  }
};

// Remove item from cart
export const removeCartItem = async (req, res) => {
  try {
    const { id } = req.params;

    const cartItem = await prisma.cartItem.findUnique({ where: { id } });

    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    if (cartItem.quantity > 1) {
      await prisma.cartItem.update({
        where: { id },
        data: { quantity: cartItem.quantity - 1 },
      });
      res.json({ message: "Item quantity reduced by 1" });
    } else {
      await prisma.cartItem.delete({ where: { id } });
      res.json({ message: "Item removed from cart" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error removing item from cart" });
  }
};
