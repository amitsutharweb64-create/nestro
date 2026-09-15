import express from "express" 
const router = express.Router();
import {register,login ,otpVarify,getme,addAddress,deleteAddress}  from "../controllers/user.controller.js";
import { protect } from "../middlewares/auth.js";


router.post("/register",register);
router.post("/login",login);
router.post("/verify_otp",otpVarify);
router.get("/get-me",protect, getme)
router.post("/add-address",protect, addAddress);
router.delete("/delete-address/:addressId", protect, deleteAddress);

export default router;


