import axios from "axios";

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 60000,
  withCredentials: true,
});

// Client-side requests (browser) can't rely on the cross-domain backend
// cookie always being sent. Attach the token from our own domain's
// cookie (set at login) as an Authorization header on every request.
client.interceptors.request.use((config) => {
  if (typeof document !== "undefined") {
    const match = document.cookie.match(/(?:^|;\s*)token=([^;]+)/);
    if (match) {
      config.headers.Authorization = `Bearer ${match[1]}`;
    }
  }
  return config;
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