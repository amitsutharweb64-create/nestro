import mongoose from "mongoose";
import dotenv from "dotenv";

import ProductModel from "../models/product.model.js";
import CategoryModel from "../models/category.model.js";
import RoomModel from "../models/room.model.js";
import connectDB from "../config/db.js";

dotenv.config();

// Full-HD Unsplash helper
const hd = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1920&q=80`;

// Helper to convert string to URL-friendly slug
const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");

// ======================================================
// CATEGORIES DATA
// ======================================================
const defaultCategories = [
  {
    name: "Sofas",
    slug: "sofas",
    image: hd("photo-1555041469-a586c61ea9bc"),
    status: true,
  },
  {
    name: "Chairs",
    slug: "chairs",
    image: hd("photo-1580481077180-877db38ff6c4"),
    status: true,
  },
  {
    name: "Beds",
    slug: "beds",
    image: hd("photo-1505693416388-ac5ce068fe85"),
    status: true,
  },
  {
    name: "Dining Tables",
    slug: "dining-tables",
    image: hd("photo-1617806118233-18e1de247200"),
    status: true,
  },
  {
    name: "Office Desks",
    slug: "office-desks",
    image: hd("photo-1518455027359-f3f8164ba6bd"),
    status: true,
  },
  {
    name: "Wardrobes & Storage",
    slug: "wardrobes-storage",
    image: hd("photo-1595428774223-ef52624120d2"),
    status: true,
  },
  {
    name: "Coffee Tables",
    slug: "coffee-tables",
    image: hd("photo-1533090161767-e6ffed986c88"),
    status: true,
  },
];

// ======================================================
// ROOMS DATA
// ======================================================
const defaultRooms = [
  {
    name: "Living Room",
    slug: "living-room",
    image: hd("photo-1618221195710-dd6b41faaea6"),
    status: true,
  },
  {
    name: "Bedroom",
    slug: "bedroom",
    image: hd("photo-1540518614846-7ede433c4ef7"),
    status: true,
  },
  {
    name: "Dining Room",
    slug: "dining-room",
    image: hd("photo-1617806118233-18e1de247200"),
    status: true,
  },
  {
    name: "Home Office",
    slug: "home-office",
    image: hd("photo-1524758631624-e2822e304c36"),
    status: true,
  },
];

// ======================================================
// PRODUCTS LIST
// ======================================================
const products = [
  // ====================================================
  // SOFAS
  // ====================================================
  {
    title: "Luna 3-Seater Fabric Sofa",
    slug: "luna-3-seater-fabric-sofa",
    categoryKey: "Sofas",
    roomKey: "Living Room",
    shortDescription: "Premium 3-seater fabric sofa for modern homes.",
    description:
      "Comfortable 3-seater fabric sofa designed for modern living spaces with high resilience foam and solid wood frame.",
    price: 27999,
    salePrice: 22999,
    stock: true,
    sold: 8,
    thumbnail: hd("photo-1555041469-a586c61ea9bc"),
    images: [
      hd("photo-1555041469-a586c61ea9bc"),
      hd("photo-1493663284031-b7e3aefcae8e"),
    ],
    material: "Fabric",
    color: "Beige",
    dimensions: { length: 210, width: 90, height: 82, unit: "cm" },
    weight: { value: 48, unit: "kg" },
    featured: false,
    bestSeller: true,
    newArrival: false,
    status: true,
  },
  {
    title: "Aria L-Shape Sectional Sofa",
    slug: "aria-l-shape-sectional-sofa",
    categoryKey: "Sofas",
    roomKey: "Living Room",
    shortDescription: "Modern L-shape sectional sofa.",
    description:
      "Large sectional sofa with deep seating and premium fabric upholstery for maximum comfort.",
    price: 45999,
    salePrice: 38999,
    stock: true,
    sold: 10,
    thumbnail: hd("photo-1583847268964-b28dc8f51f92"),
    images: [
      hd("photo-1583847268964-b28dc8f51f92"),
      hd("photo-1555041469-a586c61ea9bc"),
    ],
    material: "Fabric",
    color: "Stone Grey",
    dimensions: { length: 240, width: 150, height: 82, unit: "cm" },
    weight: { value: 72, unit: "kg" },
    featured: true,
    bestSeller: false,
    newArrival: false,
    status: true,
  },
  {
    title: "Verona Velvet Sofa",
    slug: "verona-velvet-sofa",
    categoryKey: "Sofas",
    roomKey: "Living Room",
    shortDescription: "Premium velvet sofa.",
    description:
      "Elegant velvet sofa with soft cushioning and rich emerald color for comfortable everyday use.",
    price: 36999,
    salePrice: 29999,
    stock: true,
    sold: 12,
    thumbnail: hd("photo-1598300042247-d088f8ab3a91"),
    images: [
      hd("photo-1598300042247-d088f8ab3a91"),
    ],
    material: "Fabric",
    color: "Emerald",
    dimensions: { length: 210, width: 90, height: 82, unit: "cm" },
    weight: { value: 48, unit: "kg" },
    featured: false,
    bestSeller: false,
    newArrival: true,
    status: true,
  },
  {
    title: "Cedar Sheesham Sofa",
    slug: "cedar-sheesham-sofa",
    categoryKey: "Sofas",
    roomKey: "Living Room",
    shortDescription: "Solid sheesham wood sofa.",
    description:
      "Strong sheesham wood sofa with a classic natural grain finish and comfortable supportive cushions.",
    price: 32999,
    salePrice: 27999,
    stock: true,
    sold: 14,
    thumbnail: hd("photo-1567538096630-e0c55bd6374c"),
    images: [
      hd("photo-1567538096630-e0c55bd6374c"),
    ],
    material: "Sheesham",
    color: "Walnut",
    dimensions: { length: 210, width: 90, height: 82, unit: "cm" },
    weight: { value: 55, unit: "kg" },
    featured: false,
    bestSeller: false,
    newArrival: false,
    status: true,
  },
  {
    title: "Milo Compact Sofa",
    slug: "milo-compact-sofa",
    categoryKey: "Sofas",
    roomKey: "Living Room",
    shortDescription: "Compact sofa for small living rooms.",
    description:
      "Space-saving sofa with soft fabric and comfortable cushions, ideal for apartments and studios.",
    price: 21999,
    salePrice: 18499,
    stock: true,
    sold: 16,
    thumbnail: hd("photo-1580480055273-228ff5388ef8"),
    images: [
      hd("photo-1580480055273-228ff5388ef8"),
    ],
    material: "Fabric",
    color: "Light Grey",
    dimensions: { length: 170, width: 82, height: 80, unit: "cm" },
    weight: { value: 34, unit: "kg" },
    featured: false,
    bestSeller: true,
    newArrival: false,
    status: true,
  },
  {
    title: "Harbor 2-Seater Sofa",
    slug: "harbor-2-seater-sofa",
    categoryKey: "Sofas",
    roomKey: "Living Room",
    shortDescription: "Stylish 2-seater sofa.",
    description:
      "Comfortable two-seater sofa suitable for compact living spaces and cozy corners.",
    price: 23999,
    salePrice: 19999,
    stock: true,
    sold: 18,
    thumbnail: hd("photo-1505693416388-ac5ce068fe85"),
    images: [
      hd("photo-1505693416388-ac5ce068fe85"),
    ],
    material: "Fabric",
    color: "Cream",
    dimensions: { length: 165, width: 85, height: 80, unit: "cm" },
    weight: { value: 36, unit: "kg" },
    featured: false,
    bestSeller: false,
    newArrival: true,
    status: true,
  },
  {
    title: "Atlas Modern Sofa",
    slug: "atlas-modern-sofa",
    categoryKey: "Sofas",
    roomKey: "Living Room",
    shortDescription: "Modern leather sofa.",
    description:
      "Premium modern sofa with leather upholstery, steel legs and deep cushioning.",
    price: 41999,
    salePrice: 34999,
    stock: true,
    sold: 20,
    thumbnail: hd("photo-1522771739844-6a9f6d5f14af"),
    images: [
      hd("photo-1522771739844-6a9f6d5f14af"),
    ],
    material: "Leather",
    color: "Black",
    dimensions: { length: 210, width: 90, height: 82, unit: "cm" },
    weight: { value: 58, unit: "kg" },
    featured: true,
    bestSeller: false,
    newArrival: false,
    status: true,
  },
  {
    title: "Siena Curved Sofa",
    slug: "siena-curved-sofa",
    categoryKey: "Sofas",
    roomKey: "Living Room",
    shortDescription: "Elegant curved fabric sofa.",
    description:
      "Curved silhouette sofa made for contemporary living room interiors and statement seating.",
    price: 38999,
    salePrice: 32999,
    stock: true,
    sold: 22,
    thumbnail: hd("photo-1532372320572-cda25653a26d"),
    images: [
      hd("photo-1532372320572-cda25653a26d"),
    ],
    material: "Fabric",
    color: "Ivory",
    dimensions: { length: 220, width: 92, height: 84, unit: "cm" },
    weight: { value: 52, unit: "kg" },
    featured: false,
    bestSeller: false,
    newArrival: false,
    status: true,
  },
  {
    title: "Nova Tufted Sofa",
    slug: "nova-tufted-sofa",
    categoryKey: "Sofas",
    roomKey: "Living Room",
    shortDescription: "Classic tufted sofa.",
    description:
      "Beautiful tufted sofa with premium navy fabric upholstery and soft seating.",
    price: 39999,
    salePrice: 33999,
    stock: true,
    sold: 24,
    thumbnail: hd("photo-1617806118233-18e1de247200"),
    images: [
      hd("photo-1617806118233-18e1de247200"),
    ],
    material: "Fabric",
    color: "Navy",
    dimensions: { length: 205, width: 90, height: 82, unit: "cm" },
    weight: { value: 50, unit: "kg" },
    featured: false,
    bestSeller: false,
    newArrival: true,
    status: true,
  },
  {
    title: "Oakley Wooden Arm Sofa",
    slug: "oakley-wooden-arm-sofa",
    categoryKey: "Sofas",
    roomKey: "Living Room",
    shortDescription: "Wooden arm sofa.",
    description:
      "Traditional solid wood arm sofa with a modern comfortable seat.",
    price: 30999,
    salePrice: 25999,
    stock: true,
    sold: 26,
    thumbnail: hd("photo-1493663284031-b7e3aefcae8e"),
    images: [
      hd("photo-1493663284031-b7e3aefcae8e"),
    ],
    material: "Wood",
    color: "Natural",
    dimensions: { length: 205, width: 90, height: 82, unit: "cm" },
    weight: { value: 51, unit: "kg" },
    featured: false,
    bestSeller: false,
    newArrival: false,
    status: true,
  },
  {
    title: "Dune 3+2 Sofa Set",
    slug: "dune-3-2-sofa-set",
    categoryKey: "Sofas",
    roomKey: "Living Room",
    shortDescription: "Complete 3 plus 2 sofa set.",
    description:
      "Complete family sofa set with comfortable seats and modern styling.",
    price: 54999,
    salePrice: 45999,
    stock: true,
    sold: 28,
    thumbnail: hd("photo-1518455027359-f3f8164ba6bd"),
    images: [
      hd("photo-1518455027359-f3f8164ba6bd"),
    ],
    material: "Fabric",
    color: "Taupe",
    dimensions: { length: 220, width: 90, height: 82, unit: "cm" },
    weight: { value: 75, unit: "kg" },
    featured: true,
    bestSeller: true,
    newArrival: false,
    status: true,
  },
  {
    title: "Mira Chaise Sofa",
    slug: "mira-chaise-sofa",
    categoryKey: "Sofas",
    roomKey: "Living Room",
    shortDescription: "Modern chaise sofa.",
    description:
      "Relaxed chaise sofa designed for spacious modern living rooms with olive green finish.",
    price: 42999,
    salePrice: 35999,
    stock: true,
    sold: 30,
    thumbnail: hd("photo-1558997519-83ea9252edf8"),
    images: [
      hd("photo-1558997519-83ea9252edf8"),
    ],
    material: "Fabric",
    color: "Olive",
    dimensions: { length: 230, width: 95, height: 84, unit: "cm" },
    weight: { value: 56, unit: "kg" },
    featured: false,
    bestSeller: false,
    newArrival: true,
    status: true,
  },
  {
    title: "Cove Deep-Seated Sofa",
    slug: "cove-deep-seated-sofa",
    categoryKey: "Sofas",
    roomKey: "Living Room",
    shortDescription: "Deep-seated comfortable sofa.",
    description:
      "Deep seat sofa with soft cushions for relaxing evenings at home.",
    price: 33999,
    salePrice: 28999,
    stock: true,
    sold: 32,
    thumbnail: hd("photo-1595515106969-1ce29566ff1c"),
    images: [
      hd("photo-1595515106969-1ce29566ff1c"),
    ],
    material: "Fabric",
    color: "Rust",
    dimensions: { length: 205, width: 92, height: 83, unit: "cm" },
    weight: { value: 50, unit: "kg" },
    featured: false,
    bestSeller: false,
    newArrival: false,
    status: true,
  },
  {
    title: "Regal Leather 3-Seater",
    slug: "regal-leather-3-seater",
    categoryKey: "Sofas",
    roomKey: "Living Room",
    shortDescription: "Premium leather 3-seater.",
    description:
      "Luxury leather sofa with a timeless design, sturdy wooden frame and premium cushioning.",
    price: 49999,
    salePrice: 42999,
    stock: true,
    sold: 35,
    thumbnail: hd("photo-1567016432779-094069958ea5"),
    images: [
      hd("photo-1567016432779-094069958ea5"),
    ],
    material: "Leather",
    color: "Cognac",
    dimensions: { length: 210, width: 90, height: 82, unit: "cm" },
    weight: { value: 60, unit: "kg" },
    featured: true,
    bestSeller: false,
    newArrival: false,
    status: true,
  },

  // ====================================================
  // CHAIRS
  // ====================================================
  {
    title: "Mia Accent Chair",
    slug: "mia-accent-chair",
    categoryKey: "Chairs",
    roomKey: "Living Room",
    shortDescription: "Stylish accent chair.",
    description:
      "Comfortable accent chair perfect for reading corners, bedrooms and living rooms.",
    price: 12999,
    salePrice: 10499,
    stock: true,
    sold: 12,
    thumbnail: hd("photo-1598300042247-d088f8ab3a91"),
    images: [
      hd("photo-1598300042247-d088f8ab3a91"),
    ],
    material: "Fabric",
    color: "Mustard",
    dimensions: { length: 75, width: 78, height: 90, unit: "cm" },
    weight: { value: 14, unit: "kg" },
    featured: false,
    bestSeller: false,
    newArrival: true,
    status: true,
  },
  {
    title: "Oslo Lounge Chair",
    slug: "oslo-lounge-chair",
    categoryKey: "Chairs",
    roomKey: "Living Room",
    shortDescription: "Premium lounge chair.",
    description:
      "Relaxed lounge chair with soft fabric and strong solid wood frame.",
    price: 15999,
    salePrice: 13499,
    stock: true,
    sold: 15,
    thumbnail: hd("photo-1580480055273-228ff5388ef8"),
    images: [
      hd("photo-1580480055273-228ff5388ef8"),
    ],
    material: "Fabric",
    color: "Grey",
    dimensions: { length: 80, width: 82, height: 95, unit: "cm" },
    weight: { value: 18, unit: "kg" },
    featured: true,
    bestSeller: false,
    newArrival: false,
    status: true,
  },
  {
    title: "Nora Barrel Chair",
    slug: "nora-barrel-chair",
    categoryKey: "Chairs",
    roomKey: "Living Room",
    shortDescription: "Modern barrel chair.",
    description:
      "Soft rounded barrel chair with comfortable fabric seating.",
    price: 14999,
    salePrice: 12499,
    stock: true,
    sold: 18,
    thumbnail: hd("photo-1567538096630-e0c55bd6374c"),
    images: [
      hd("photo-1567538096630-e0c55bd6374c"),
    ],
    material: "Fabric",
    color: "Cream",
    dimensions: { length: 80, width: 78, height: 88, unit: "cm" },
    weight: { value: 14, unit: "kg" },
    featured: false,
    bestSeller: false,
    newArrival: true,
    status: true,
  },
  {
    title: "Reed Dining Chair",
    slug: "reed-dining-chair",
    categoryKey: "Chairs",
    roomKey: "Dining Room",
    shortDescription: "Classic wooden dining chair.",
    description:
      "Durable wooden dining chair with ergonomic back support and comfortable seating.",
    price: 6999,
    salePrice: 5599,
    stock: true,
    sold: 18,
    thumbnail: hd("photo-1493663284031-b7e3aefcae8e"),
    images: [
      hd("photo-1493663284031-b7e3aefcae8e"),
    ],
    material: "Wood",
    color: "Natural",
    dimensions: { length: 48, width: 52, height: 88, unit: "cm" },
    weight: { value: 7, unit: "kg" },
    featured: false,
    bestSeller: false,
    newArrival: false,
    status: true,
  },
  {
    title: "Cora Dining Chair",
    slug: "cora-dining-chair",
    categoryKey: "Chairs",
    roomKey: "Dining Room",
    shortDescription: "Upholstered dining chair.",
    description:
      "Dining chair with padded seat and comfortable upholstered back for long meals.",
    price: 7999,
    salePrice: 6499,
    stock: true,
    sold: 20,
    thumbnail: hd("photo-1598300042247-d088f8ab3a91"),
    images: [
      hd("photo-1598300042247-d088f8ab3a91"),
    ],
    material: "Fabric",
    color: "Beige",
    dimensions: { length: 50, width: 55, height: 90, unit: "cm" },
    weight: { value: 8, unit: "kg" },
    featured: false,
    bestSeller: false,
    newArrival: true,
    status: true,
  },
  {
    title: "Vega Office Chair",
    slug: "vega-office-chair",
    categoryKey: "Chairs",
    roomKey: "Home Office",
    shortDescription: "Ergonomic office chair.",
    description:
      "Comfortable office chair with durable metal frame and supportive seating for long working hours.",
    price: 9999,
    salePrice: 7999,
    stock: true,
    sold: 22,
    thumbnail: hd("photo-1580480055273-228ff5388ef8"),
    images: [
      hd("photo-1580480055273-228ff5388ef8"),
    ],
    material: "Metal",
    color: "Black",
    dimensions: { length: 65, width: 65, height: 110, unit: "cm" },
    weight: { value: 12, unit: "kg" },
    featured: false,
    bestSeller: true,
    newArrival: false,
    status: true,
  },

  // ====================================================
  // BEDS
  // ====================================================
  {
    title: "King Size Hydraulic Storage Bed",
    slug: "king-size-hydraulic-storage-bed",
    categoryKey: "Beds",
    roomKey: "Bedroom",
    shortDescription: "Spacious king size bed with cushioned headboard & hydraulic lift.",
    description:
      "Upgrade your bedroom with luxury and practicality. The gas-lift hydraulic mechanism allows easy access to ample under-bed storage.",
    price: 45999,
    salePrice: 38999,
    stock: true,
    sold: 14,
    thumbnail: hd("photo-1505693416388-ac5ce068fe85"),
    images: [
      hd("photo-1505693416388-ac5ce068fe85"),
      hd("photo-1540518614846-7ede433c4ef7"),
    ],
    material: "Engineered Wood",
    color: "Walnut & Charcoal",
    dimensions: { length: 215, width: 195, height: 110, unit: "cm" },
    weight: { value: 85, unit: "kg" },
    featured: true,
    bestSeller: true,
    newArrival: false,
    status: true,
  },
  {
    title: "Nordic Solid Wood Queen Bed",
    slug: "nordic-solid-wood-queen-bed",
    categoryKey: "Beds",
    roomKey: "Bedroom",
    shortDescription: "Minimalist queen bed made from solid Sheesham wood.",
    description:
      "Crafted with timeless Nordic aesthetics, this queen bed features sturdy solid wood slatted base and sleek headboard.",
    price: 36999,
    salePrice: 31999,
    stock: true,
    sold: 19,
    thumbnail: hd("photo-1540518614846-7ede433c4ef7"),
    images: [
      hd("photo-1540518614846-7ede433c4ef7"),
    ],
    material: "Sheesham",
    color: "Honey Teak",
    dimensions: { length: 205, width: 160, height: 95, unit: "cm" },
    weight: { value: 65, unit: "kg" },
    featured: false,
    bestSeller: true,
    newArrival: false,
    status: true,
  },

  // ====================================================
  // DINING TABLES
  // ====================================================
  {
    title: "Solid Sheesham 6-Seater Dining Table",
    slug: "solid-sheesham-6-seater-dining-table",
    categoryKey: "Dining Tables",
    roomKey: "Dining Room",
    shortDescription: "Premium Sheesham wood dining table with natural grain finish.",
    description:
      "Gather your family around this durable Sheesham wood dining table. Features a rich honey finish and water-resistant coating.",
    price: 29999,
    salePrice: 24999,
    stock: true,
    sold: 11,
    thumbnail: hd("photo-1617806118233-18e1de247200"),
    images: [
      hd("photo-1617806118233-18e1de247200"),
      hd("photo-1533090161767-e6ffed986c88"),
    ],
    material: "Sheesham",
    color: "Honey Brown",
    dimensions: { length: 180, width: 90, height: 76, unit: "cm" },
    weight: { value: 45, unit: "kg" },
    featured: false,
    bestSeller: true,
    newArrival: false,
    status: true,
  },
  {
    title: "Marble Top Luxury 4-Seater Dining Table",
    slug: "marble-top-luxury-4-seater-dining-table",
    categoryKey: "Dining Tables",
    roomKey: "Dining Room",
    shortDescription: "Luxury Italian marble top dining table with gold steel frame.",
    description:
      "Make an impression with this high-end dining table featuring genuine polished white marble and stainless steel geometric base.",
    price: 48999,
    salePrice: 41999,
    stock: true,
    sold: 7,
    thumbnail: hd("photo-1533090161767-e6ffed986c88"),
    images: [
      hd("photo-1533090161767-e6ffed986c88"),
    ],
    material: "Marble",
    color: "Carrara White / Gold",
    dimensions: { length: 150, width: 90, height: 75, unit: "cm" },
    weight: { value: 68, unit: "kg" },
    featured: true,
    bestSeller: false,
    newArrival: true,
    status: true,
  },

  // ====================================================
  // OFFICE DESKS
  // ====================================================
  {
    title: "Minimalist Executive Office Desk",
    slug: "minimalist-executive-office-desk",
    categoryKey: "Office Desks",
    roomKey: "Home Office",
    shortDescription: "Sleek work desk with steel frame and cable management tray.",
    description:
      "Designed for focused productivity. Sturdy powder-coated steel frame paired with a scratch-resistant desktop surface.",
    price: 18999,
    salePrice: 14999,
    stock: true,
    sold: 25,
    thumbnail: hd("photo-1518455027359-f3f8164ba6bd"),
    images: [
      hd("photo-1518455027359-f3f8164ba6bd"),
      hd("photo-1524758631624-e2822e304c36"),
    ],
    material: "Steel",
    color: "Matte Black / Oak",
    dimensions: { length: 140, width: 70, height: 75, unit: "cm" },
    weight: { value: 28, unit: "kg" },
    featured: false,
    bestSeller: false,
    newArrival: true,
    status: true,
  },

  // ====================================================
  // STORAGE & WARDROBES
  // ====================================================
  {
    title: "Contemporary 3-Door Wardrobe",
    slug: "contemporary-3-door-wardrobe",
    categoryKey: "Wardrobes & Storage",
    roomKey: "Bedroom",
    shortDescription: "Modular wardrobe with full-length mirror and lockable drawers.",
    description:
      "Keep your clothing organized in style. Multiple hanging rods, adjustable shelves, and soft-close door hinges.",
    price: 32999,
    salePrice: 26999,
    stock: true,
    sold: 16,
    thumbnail: hd("photo-1595428774223-ef52624120d2"),
    images: [
      hd("photo-1595428774223-ef52624120d2"),
    ],
    material: "Engineered Wood",
    color: "Frost White & Oak",
    dimensions: { length: 120, width: 55, height: 198, unit: "cm" },
    weight: { value: 72, unit: "kg" },
    featured: true,
    bestSeller: false,
    newArrival: true,
    status: true,
  },
];

// ======================================================
// SEEDING EXECUTION
// ======================================================
const seedDatabase = async () => {
  try {
    console.log("🌱 Connecting to MongoDB...");
    await connectDB();

    console.log("\n📁 [1/3] Ensuring Categories in Database...");
    const categoryMap = {};

    // 1. Seed standard categories
    for (const cat of defaultCategories) {
      let doc = await CategoryModel.findOne({
        $or: [{ slug: cat.slug }, { name: cat.name }],
      });
      if (!doc) {
        doc = await CategoryModel.create(cat);
        console.log(`  ➕ Created Category: "${cat.name}"`);
      } else {
        console.log(`  ✔ Category exists: "${doc.name}"`);
      }
      categoryMap[cat.name.toLowerCase()] = doc._id;
      categoryMap[cat.slug.toLowerCase()] = doc._id;
    }

    console.log("\n🏠 [2/3] Ensuring Rooms in Database...");
    const roomMap = {};

    // 2. Seed standard rooms
    for (const room of defaultRooms) {
      let doc = await RoomModel.findOne({
        $or: [{ slug: room.slug }, { name: room.name }],
      });
      if (!doc) {
        doc = await RoomModel.create(room);
        console.log(`  ➕ Created Room: "${room.name}"`);
      } else {
        console.log(`  ✔ Room exists: "${doc.name}"`);
      }
      roomMap[room.name.toLowerCase()] = doc._id;
      roomMap[room.slug.toLowerCase()] = doc._id;
    }

    console.log("\n🛋️ [3/3] Seeding Products...");
    let insertedCount = 0;
    let updatedCount = 0;

    for (const p of products) {
      // Find category
      const catKey = (p.categoryKey || p.categorySlug || "").toLowerCase();
      let categoryId = categoryMap[catKey];

      // Auto-create category if missing
      if (!categoryId && p.categoryKey) {
        const catSlug = slugify(p.categoryKey);
        let dynamicCat = await CategoryModel.findOne({
          $or: [{ slug: catSlug }, { name: p.categoryKey }],
        });
        if (!dynamicCat) {
          dynamicCat = await CategoryModel.create({
            name: p.categoryKey,
            slug: catSlug,
            image: p.thumbnail,
            status: true,
          });
          console.log(`  ➕ Auto-created missing Category: "${p.categoryKey}"`);
        }
        categoryId = dynamicCat._id;
        categoryMap[catKey] = categoryId;
      }

      // Find room
      const rKey = (p.roomKey || p.roomSlug || "").toLowerCase();
      let roomId = roomMap[rKey];

      // Auto-create room if missing
      if (!roomId && p.roomKey) {
        const rSlug = slugify(p.roomKey);
        let dynamicRoom = await RoomModel.findOne({
          $or: [{ slug: rSlug }, { name: p.roomKey }],
        });
        if (!dynamicRoom) {
          dynamicRoom = await RoomModel.create({
            name: p.roomKey,
            slug: rSlug,
            image: p.thumbnail,
            status: true,
          });
          console.log(`  ➕ Auto-created missing Room: "${p.roomKey}"`);
        }
        roomId = dynamicRoom._id;
        roomMap[rKey] = roomId;
      }

      if (!categoryId || !roomId) {
        console.warn(`  ⚠️ Skipping "${p.title}": category or room could not be resolved`);
        continue;
      }

      // Calculate discount percentage
      const discount =
        p.discount ||
        (p.salePrice && p.salePrice < p.price
          ? Math.round(((p.price - p.salePrice) / p.price) * 100)
          : 0);

      const productData = {
        title: p.title,
        slug: p.slug || slugify(p.title),
        shortDescription: p.shortDescription || "",
        description: p.description,
        category: categoryId,
        roomType: roomId,
        price: p.price,
        salePrice: p.salePrice || p.price,
        discount: discount,
        stock: p.stock !== undefined ? p.stock : true,
        sold: p.sold || 0,
        thumbnail: p.thumbnail,
        images: p.images && p.images.length > 0 ? p.images : [p.thumbnail],
        material: p.material || "Wood",
        color: p.color || "Standard",
        dimensions: p.dimensions || { length: 0, width: 0, height: 0, unit: "cm" },
        weight: p.weight || { value: 0, unit: "kg" },
        featured: Boolean(p.featured),
        bestSeller: Boolean(p.bestSeller),
        newArrival: Boolean(p.newArrival),
        status: p.status !== undefined ? p.status : true,
      };

      const existing = await ProductModel.findOne({ slug: productData.slug });
      if (!existing) {
        await ProductModel.create(productData);
        insertedCount++;
        console.log(`  ➕ Inserted: "${p.title}"`);
      } else {
        await ProductModel.findByIdAndUpdate(existing._id, productData);
        updatedCount++;
        console.log(`  🔄 Updated: "${p.title}"`);
      }
    }

    console.log(`\n========================================`);
    console.log(`🎉 Seeding Complete!`);
    console.log(`   - Newly Inserted: ${insertedCount} products`);
    console.log(`   - Updated: ${updatedCount} products`);
    console.log(`========================================\n`);
  } catch (error) {
    console.error("\n❌ Seeding Error:", error);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 MongoDB Connection Closed\n");
    process.exit(0);
  }
};

seedDatabase();
