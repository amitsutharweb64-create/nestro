import express from "express";
import { addToCart } from "../controllers/cart.controller.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.post("/sync", protect, addToCart);

export default router;
