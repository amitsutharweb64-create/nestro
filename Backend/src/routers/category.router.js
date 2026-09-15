import express from "express" 
const router = express.Router();
import {read ,readById,create,updateStatus,edit,deleteById }  from "../controllers/category.controller.js";
import upload from "../middlewares/upload.js";
import { authorized, protect } from "../middlewares/auth.js";

router.get("/",read);
router.get("/:id",readById);
router.post("/create" ,upload.single("image"),create);
router.patch("/status-update/:id", protect,authorized("admin","superadmin"),updateStatus);
router.put("/edit/:id",upload.single("image"),edit);
router.delete("/delete/:id",deleteById);

export default router;


