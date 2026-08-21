import express from "express";
const router = express.Router();
import { read, readById, create, updateStatus, edit, deleteById,updateFlag,addImages } from "../controllers/product.controller.js"
import upload from "../middlewares/upload.js";

router.get("/", read);
router.get("/:id", readById);
router.post("/create", upload.single("thumbnail"), create);
router.patch("/status-update/:id", updateStatus);
router.put("/edit/:id",upload.single("image"), edit);
router.delete("/delete/:id", deleteById);
router.patch("/update-flag/:id", updateFlag);
router.patch("/add-images/:id", upload.array("images",2),addImages);


export default router;
