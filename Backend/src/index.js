import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import categoryRouter from "./routers/category.router.js";
import roomRoter from "./routers/room.router.js";
import productRoter from "./routers/product.router.js";

dotenv.config();

const app = express();

// Database Connection
connectDB();

// Middlewares
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Chrome DevTools probes this URL while inspecting localhost applications.
// We do not use automatic workspace discovery, so return an empty success response.
app.get("/.well-known/appspecific/com.chrome.devtools.json", (req, res) => {
  res.status(204).end();
});

// Routes
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Server Running Successfully",
  });
});

app.use("/api/category", categoryRouter);
app.use("/api/room-type", roomRoter);
app.use("/api/product", productRoter);

// Keep unknown routes as JSON instead of Express's default HTML error response.
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
