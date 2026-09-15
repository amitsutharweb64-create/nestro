import express from "express";
import { Orderplace, getOrders, verifyRazorpayPayment } from "../controllers/order.controller.js";
import { protect,authorized } from "../middlewares/auth.js";

const router = express.Router();

router.post("/place", protect, Orderplace);
router.post("/verify-payment", protect, verifyRazorpayPayment);
router.get("/",protect,authorized("admin","superAdmin"),getOrders);

export default router;
