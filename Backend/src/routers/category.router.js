import express from "express" 
const router = express.Router();
import {read ,readById,create,updateStatus,edit,deleteById }  from "../controllers/category.controller.js";
import upload from "../middlewares/upload.js";


router.get("/",read);
router.get("/:id",readById);
router.post("/create" ,upload.single("image"),create);
router.patch("/status-update/:id",updateStatus);
router.put("/edit/:id",upload.single("image"),edit);
router.delete("/delete/:id",deleteById);

export default router;


