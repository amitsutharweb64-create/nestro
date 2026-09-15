import CartModel from "../models/cart.model.js";
import OrderModel from "../models/order.model.js";

import {
  sendBadRequest,
  sendCreated,
  sendNotFound,
  sendServerError,
} from "../utils/response.js";

import Razorpay from "razorpay";
import crypto from "crypto";
var instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ADMIN: GET ALL ORDERS
export const getOrders = async (req, res) => {
  try {
    // Pagination
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(
      Math.max(parseInt(req.query.limit) || 10, 1),
      100
    );

    const skip = (page - 1) * limit;

    // Query parameters
    const {
      search,
      paymentMethod,
      paymentStatus,
      orderStatus,
      user,
      startDate,
      endDate,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    // Main filter object
    const filter = {};

    // Search
    if (search) {
      filter.$or = [
        { "shippingAddress.fullName": { $regex: search, $options: "i" } },
        { "shippingAddress.mobile": { $regex: search, $options: "i" } },
        { "shippingAddress.city": { $regex: search, $options: "i" } },
        { "shippingAddress.pincode": { $regex: search, $options: "i" } },
      ];
    }

    // Payment method
    if (paymentMethod) {
      filter.paymentMethod = paymentMethod;
    }

    // Payment status
    if (paymentStatus) {
      filter.paymentStatus = paymentStatus;
    }

    // Order status
    if (orderStatus) {
      filter.orderStatus = orderStatus;
    }

    // User filter
    if (user) {
      filter.user = user;
    }

    // Date filter
    if (startDate || endDate) {
      filter.createdAt = {};

      if (startDate) {
        filter.createdAt.$gte = new Date(startDate);
      }

      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);

        filter.createdAt.$lte = end;
      }
    }

    // Sorting
    const allowedSortFields = [
      "createdAt",
      "updatedAt",
      "totalAmount",
      "orderStatus",
      "paymentStatus",
    ];

    const finalSortBy = allowedSortFields.includes(sortBy)
      ? sortBy
      : "createdAt";

    const finalSortOrder = sortOrder === "asc" ? 1 : -1;

    // Get orders + total count together
    const [orders, totalOrders] = await Promise.all([
      OrderModel.find(filter)
        .populate("user", "name email")
        .populate("items.product_id")
        .sort({ [finalSortBy]: finalSortOrder })
        .skip(skip)
        .limit(limit),

      OrderModel.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(totalOrders / limit);

    return res.status(200).json({
      success: true,
      message: "Orders fetched successfully",

      data: orders,

      pagination: {
        currentPage: page,
        limit,
        totalOrders,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    });
  } catch (error) {
    console.error("Get Orders Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

export const Orderplace = async (req, res) => {
  try {
    const userId = req.user._id;

    const { shippingAddress, paymentMethod } = req.body;

    // Keep this list aligned with OrderModel's paymentMethod enum.
    if (!paymentMethod || !["cod", "upi", "card"].includes(paymentMethod)) {
      return sendBadRequest(res, "Please select a valid payment method");
    }

    // Check address
    if (!shippingAddress) {
      return sendBadRequest(res, "Shipping address is required");
    }

    // Get user's cart
    const cart = await CartModel.findOne({ userId }).populate(
      "items.productId",
      "_id title slug price salePrice thumbnail",
    );

    if (!cart) {
      return sendNotFound(res, "Cart not found");
    }

    // Check cart items
    if (!cart.items || cart.items.length === 0) {
      return sendBadRequest(res, "Cart is empty");
    }

    // Create order items
    const items = cart.items.map((item) => {
      const product = item.productId;

      const price = product.salePrice || product.price;

      return {
        product_id: product._id,
        qty: item.qty,
        price: price,
        total: price * item.qty,
      };
    });

    // Calculate total
    const total = items.reduce((sum, item) => sum + item.total, 0);

    // Shipping address
    const orderShippingAddress = {
      fullName: shippingAddress.fullName,
      mobile: shippingAddress.mobile,
      address: shippingAddress.addressLine,
      city: shippingAddress.city,
      state: shippingAddress.state,
      pincode: shippingAddress.pincode,
    };

    // Create order
    const order = await OrderModel.create({
      user: userId,
      items: items,
      shippingAddress: orderShippingAddress,
      paymentMethod: paymentMethod,
      totalAmount: total,
    });

    // COD
    if (paymentMethod === "cod") {
      return sendCreated(res, "Order placed successfully", {
        order,
        orderId: order._id,
      });
    }

    const razorpayOrder = await instance.orders.create({
      amount: total * 100, // Razorpay expects paise, not rupees.
      currency: "INR",
      receipt: order._id.toString(),
    });

    order.razorpay_order_id = razorpayOrder.id;
    await order.save();

    return res.status(201).json({
      success: true,
      message: "Razorpay order created successfully",
      orderId: order._id,
      razorpay_order_id: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
    });
  } catch (error) {
    console.log("Order Place Error:", error);

    return sendServerError(res);
  }
};

export const verifyRazorpayPayment = async (req, res) => {
  try {
    const userId = req.user._id;
    const {
      orderId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    if (!orderId || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return sendBadRequest(res, "Incomplete payment verification details");
    }

    const order = await OrderModel.findOne({ _id: orderId, user: userId });
    if (!order) return sendNotFound(res, "Order not found");

    if (order.razorpay_order_id !== razorpay_order_id) {
      return sendBadRequest(res, "Payment order does not match");
    }

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (
      expectedSignature.length !== razorpay_signature.length ||
      !crypto.timingSafeEqual(
        Buffer.from(expectedSignature),
        Buffer.from(razorpay_signature),
      )
    ) {
      return sendBadRequest(res, "Payment verification failed");
    }

    order.paymentStatus = "paid";
    order.razorpay_payment_id = razorpay_payment_id;
    order.paidAt = new Date();
    await order.save();

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      orderId: order._id,
    });
  } catch (error) {
    console.log("Razorpay Payment Verification Error:", error);
    return sendServerError(res, error);
  }
};
