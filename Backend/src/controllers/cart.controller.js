import CartModel from "../models/cart.model.js";

import {
  sendBadRequest,
  sendConflict,
  sendCreated,
  sendNotFound,
  sendServerError,
  sendSuccess,
} from "../utils/response.js";

export const addToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { items } = req.body;

    const cartItems = JSON.parse(items);

    if (!Array.isArray(cartItems)) {
      return sendBadRequest(res, "cart must be an array");
    }

    const userCart = await CartModel.findOne({ userId });

    // Cart doesn't exist
    if (!userCart) {
      const newCart = await CartModel.create({
        userId,
        items: cartItems,
      });

      const populatedCart = await CartModel.findById(newCart._id).populate(
        "items.productId",
        "_id title slug price salePrice thumbnail"
      );

      return res.status(201).json({
        success: true,
        message: "Cart created successfully",
        cart: populatedCart,
      });
    }

    // Sync means the browser cart is the complete current cart, including removals.
    userCart.items = cartItems;

    await userCart.save();

    // Populate after save
    const updatedCart = await CartModel.findById(userCart._id).populate(
      "items.productId",
      "_id title slug price salePrice thumbnail"
    );

    return res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      cart: updatedCart,
    });
  } catch (error) {
    console.log("Cart Error:", error);
    return sendServerError(res);
  }
};   


