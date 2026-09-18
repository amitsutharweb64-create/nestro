import axios from "axios";

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 60000,
  withCredentials: true,
});

function generateSlug(text) {
  return text
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const allowedImageTypes = ["image/jpeg", "image/png", "image/webp"];
const maxImageSize = 5 * 1024 * 1024;

function getImageValidationError(file) {
  if (!allowedImageTypes.includes(file.type)) {
    return "Only JPG, PNG, and WEBP images are allowed";
  }

  if (file.size > maxImageSize) {
    return "Image size must be 5 MB or less";
  }

  return "";
}

export { client, generateSlug, getImageValidationError };
