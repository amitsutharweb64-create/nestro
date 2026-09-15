

import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";  


const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "nestro",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});
 
const allowedImageTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, callback) => {
    if (!allowedImageTypes.has(file.mimetype)) {
      return callback(new Error("Only JPG, PNG, and WEBP images are allowed"));
    }

    callback(null, true);
  },
});

export default upload;
