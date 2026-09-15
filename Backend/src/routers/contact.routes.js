import express from "express";
import {
  createContact,
  getContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
} from "../controllers/contact.controller.js";

const router = express.Router();

router.post("/create", createContact);
router.get("/", getContacts);
router.get("/:id", getContactById);
router.patch("/status/:id", updateContactStatus);
router.patch("/status-update/:id", updateContactStatus);
router.delete("/delete/:id", deleteContact);
router.delete("/:id", deleteContact);

export default router;
