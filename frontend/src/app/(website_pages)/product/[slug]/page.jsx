"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import { fetchProducts } from "@/api/api";
import { addToCart } from "@/redux/features/cartSlice";

import {
  Star,
  ShoppingCart,
  Minus,
  Plus,
  Truck,
  RotateCcw,
  ShieldCheck,
  Heart,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";


// =====================================================
// COLORS
// =====================================================

const colors = [
  {
    name: "Charcoal",
    color: "#4b5052",
  },
  {
    name: "Beige",
    color: "#ddd5c8",
  },
  {
    name: "Green",
    color: "#637b6b",
  },
];


// =====================================================
// PAGE
// =====================================================

export default function ProductDetailsPage() {

  const { slug } = useParams();
  const router = useRouter();
  const dispatcher = useDispatch();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [selectedImage, setSelectedImage] = useState(0);

  const [quantity, setQuantity] = useState(1);

  const [selectedColor, setSelectedColor] =
    useState("Charcoal");


  // ===================================================
  // FETCH PRODUCT
  // ===================================================

  useEffect(() => {

    const loadProduct = async () => {

      try {
        setIsLoading(true);
        setLoadError("");

        const response = await fetchProducts({
          limit: 1000,
        });

        const foundProduct = response.data?.find(
          (item) => item.slug === slug
        );

        if (!foundProduct) {
          setLoadError("Product not found");
          return;
        }


        setSelectedImage(0);
        setProduct({

          _id: foundProduct._id,

          title: foundProduct.title,

          slug: foundProduct.slug,

          salePrice: foundProduct.salePrice || foundProduct.price,

          originalPrice: foundProduct.price,

          thumbnail: foundProduct.thumbnail,

          name: foundProduct.title,

          category:
            foundProduct.category?.name ||
            "Furniture",

          price:
            foundProduct.salePrice ||
            foundProduct.price,

          oldPrice:
            foundProduct.price,

          rating: 5,

          reviews: 0,

          description:
            foundProduct.description ||
            foundProduct.shortDescription ||
            "No description available for this product.",

          images: [
            foundProduct.thumbnail,
            ...(foundProduct.images || []),
          ].filter(Boolean),

          color: foundProduct.color || "",
          material: foundProduct.material || "",
          dimensions: foundProduct.dimensions || null,
          roomType: foundProduct.roomType || null,
          stock: foundProduct.stock,

        });

      } catch (error) {

        console.error(
          "Product Details Error:",
          error
        );
        setLoadError("Unable to load product details");
      } finally {
        setIsLoading(false);

      }

    };


    loadProduct();

  }, [slug]);

  // ===================================================
  // QUANTITY
  // ===================================================

  const increaseQuantity = () => {

    setQuantity((prev) => prev + 1);

  };


  const decreaseQuantity = () => {

    setQuantity((prev) =>
      prev > 1 ? prev - 1 : 1
    );

  };

  const addProductToCart = () => {
    for (let count = 0; count < quantity; count += 1) {
      dispatcher(
        addToCart({
          _id: product._id,
          name: product.name,
          title: product.title,
          slug: product.slug,
          salePrice: product.salePrice,
          originalPrice: product.originalPrice,
          thumbnail: product.thumbnail,
          qty: 1,
        })
      );
    }
  };

  const handleBuyNow = () => {
    addProductToCart();
    router.push("/checkout");
  };


  // ===================================================
  // IMAGE SLIDER
  // ===================================================

  const nextImage = () => {

    setSelectedImage((prev) =>

      prev === product.images.length - 1
        ? 0
        : prev + 1

    );

  };


  const previousImage = () => {

    setSelectedImage((prev) =>

      prev === 0
        ? product.images.length - 1
        : prev - 1

    );

  };


  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white px-4">
        <p className="text-sm text-gray-500">Loading product details...</p>
      </main>
    );
  }

  // ===================================================
  // DISCOUNT
  // ===================================================

  const discount =
    product.oldPrice > product.price
      ? product.oldPrice - product.price
      : 0;

  if (!product) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          {loadError || "Product not found"}
        </h1>
        <Link
          href="/store"
          className="mt-5 rounded-xl bg-[#1d1a18] px-5 py-3 text-sm font-semibold text-white"
        >
          Back to Store
        </Link>
      </main>
    );
  }


  // ===================================================
  // RETURN
  // ===================================================

  return (

    <main className="min-h-screen bg-white">


      {/* =================================================
          PRODUCT SECTION
      ================================================= */}

      <section className="mx-auto max-w-7xl px-5 py-8 md:px-8 lg:px-10">


        {/* =================================================
            BREADCRUMB
        ================================================= */}

        <div className="mb-8 flex flex-wrap items-center gap-2 text-sm text-gray-500">

          <Link
            href="/"
            className="transition hover:text-[#c85a00]"
          >
            Home
          </Link>

          <span>/</span>

          <Link
            href="/store"
            className="transition hover:text-[#c85a00]"
          >
            Store
          </Link>

          <span>/</span>

          <span className="text-gray-900">
            {product.name}
          </span>

        </div>



        {/* =================================================
            MAIN PRODUCT GRID
        ================================================= */}

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">


          {/* =================================================
              LEFT SIDE - PRODUCT IMAGES
          ================================================= */}

          <div className="lg:sticky lg:top-24 lg:self-start">


            {/* =============================================
                MAIN IMAGE
            ============================================= */}

            <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-[#f5f2ee] lg:aspect-auto lg:h-[calc(100vh-220px)] lg:max-h-155">


              {/* BEST SELLER */}

              <div className="absolute left-5 top-5 z-10 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#c85a00] shadow-sm">

                Best Seller

              </div>



              {/* WISHLIST */}

              <button
                type="button"
                className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm transition hover:scale-105"
              >

                <Heart
                  size={20}
                  strokeWidth={1.7}
                />

              </button>



              {/* MAIN PRODUCT IMAGE */}

              {product.images?.length > 0 && (

                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition duration-500"
                />

              )}



              {/* PREVIOUS BUTTON */}

              {product.images?.length > 1 && (

                <button
                  type="button"
                  onClick={previousImage}
                  className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-105"
                >

                  <ChevronLeft size={20} />

                </button>

              )}



              {/* NEXT BUTTON */}

              {product.images?.length > 1 && (

                <button
                  type="button"
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-105"
                >

                  <ChevronRight size={20} />

                </button>

              )}

            </div>



            {/* =================================================
                THUMBNAILS
                MAIN IMAGE KE NICHE
            ================================================= */}

            <div className="mt-4 flex gap-3 overflow-x-auto pb-2">

              {product.images?.map(
                (image, index) => (

                  <button
                    type="button"
                    key={index}
                    onClick={() =>
                      setSelectedImage(index)
                    }
                    className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 bg-[#f7f5f2] transition ${
                      selectedImage === index
                        ? "border-[#c85a00]"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >

                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />

                  </button>

                )
              )}

            </div>

          </div>



          {/* =================================================
              RIGHT SIDE - PRODUCT INFORMATION
          ================================================= */}

          <div className="flex flex-col justify-center">


            {/* CATEGORY */}

            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c85a00]">

              {product.category}

            </p>



            {/* PRODUCT NAME */}

            <h1 className="mt-3 text-3xl font-semibold leading-tight text-gray-900 md:text-4xl">

              {product.name}

            </h1>



            {/* RATING */}

            <div className="mt-4 flex items-center gap-3">

              <div className="flex gap-1">

                {[1, 2, 3, 4, 5].map(
                  (item) => (

                    <Star
                      key={item}
                      size={18}
                      fill="#f59e0b"
                      className="text-[#f59e0b]"
                    />

                  )
                )}

              </div>


              <span className="text-sm text-gray-500">

                {product.rating} (
                {product.reviews} Reviews)

              </span>

            </div>



            {/* PRICE */}

            <div className="mt-6 flex flex-wrap items-center gap-3">


              <span className="text-3xl font-bold text-gray-900">

                ₹
                {Number(product.price || 0).toLocaleString(
                  "en-IN"
                )}

              </span>



              {product.oldPrice > product.price && (

                <span className="text-lg text-gray-400 line-through">

                  ₹
                  {Number(
                    product.oldPrice
                  ).toLocaleString("en-IN")}

                </span>

              )}



              {discount > 0 && (

                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">

                  Save ₹
                  {discount.toLocaleString("en-IN")}

                </span>

              )}

            </div>



            {/* DESCRIPTION */}

            <p className="mt-6 max-w-xl text-[15px] leading-7 text-gray-600">

              {product.description}

            </p>



            {/* DIVIDER */}

            <div className="my-7 h-px bg-gray-200" />



            {/* =================================================
                COLOR
            ================================================= */}

            <div>

              <h3 className="text-sm font-semibold text-gray-900">

                Color

              </h3>



              <div className="mt-4 flex gap-5">

                {colors.map((item) => (

                  <button
                    type="button"
                    key={item.name}
                    onClick={() =>
                      setSelectedColor(item.name)
                    }
                    className="flex flex-col items-center gap-2"
                  >

                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                        selectedColor === item.name
                          ? "border-gray-900"
                          : "border-gray-200"
                      }`}
                    >

                      <span
                        className="h-7 w-7 rounded-full"
                        style={{
                          backgroundColor:
                            item.color,
                        }}
                      />

                    </span>



                    <span className="text-xs text-gray-600">

                      {item.name}

                    </span>

                  </button>

                ))}

              </div>

            </div>



            {/* =================================================
                QUANTITY
            ================================================= */}

            <div className="mt-7">

              <h3 className="text-sm font-semibold text-gray-900">

                Quantity

              </h3>



              <div className="mt-3 flex h-11 w-32 items-center justify-between rounded-full border border-gray-300 px-3">


                <button
                  type="button"
                  onClick={decreaseQuantity}
                  className="flex h-7 w-7 items-center justify-center rounded-full transition hover:bg-gray-100"
                >

                  <Minus size={16} />

                </button>



                <span className="text-sm font-semibold">

                  {quantity}

                </span>



                <button
                  type="button"
                  onClick={increaseQuantity}
                  className="flex h-7 w-7 items-center justify-center rounded-full transition hover:bg-gray-100"
                >

                  <Plus size={16} />

                </button>


              </div>

            </div>



            {/* =================================================
                BUTTONS
            ================================================= */}

            <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">


              {/* ADD TO CART */}

              <button
                type="button"
                onClick={addProductToCart}
                className="flex h-13 items-center justify-center gap-2 rounded-xl bg-[#1d1a18] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#2c2825]"
              >

                <ShoppingCart size={19} />

                Add to Cart

              </button>



              {/* BUY NOW */}

              <button
                type="button"
                onClick={handleBuyNow}
                className="h-13 rounded-xl border border-[#c85a00] px-6 py-3.5 text-sm font-semibold text-[#c85a00] transition hover:bg-[#c85a00] hover:text-white"
              >

                Buy Now

              </button>


            </div>



            {/* =================================================
                SERVICE FEATURES
            ================================================= */}

            <div className="mt-8 grid grid-cols-1 gap-5 border-t border-gray-200 pt-7 sm:grid-cols-3">


              {/* FREE DELIVERY */}

              <div className="flex items-center gap-3">

                <Truck
                  size={22}
                  strokeWidth={1.6}
                />

                <div>

                  <p className="text-xs font-semibold text-gray-900">

                    Free Delivery

                  </p>

                  <p className="mt-1 text-[11px] text-gray-500">

                    On all orders

                  </p>

                </div>

              </div>



              {/* RETURNS */}

              <div className="flex items-center gap-3">

                <RotateCcw
                  size={22}
                  strokeWidth={1.6}
                />

                <div>

                  <p className="text-xs font-semibold text-gray-900">

                    7 Days Returns

                  </p>

                  <p className="mt-1 text-[11px] text-gray-500">

                    Hassle free

                  </p>

                </div>

              </div>



              {/* PAYMENT */}

              <div className="flex items-center gap-3">

                <ShieldCheck
                  size={22}
                  strokeWidth={1.6}
                />

                <div>

                  <p className="text-xs font-semibold text-gray-900">

                    Secure Payment

                  </p>

                  <p className="mt-1 text-[11px] text-gray-500">

                    100% protected

                  </p>

                </div>

              </div>


            </div>

          </div>

        </div>



        {/* =================================================
            PRODUCT DETAILS
        ================================================= */}

        <div className="mt-20 overflow-hidden rounded-2xl border border-gray-200">


          {/* TABS */}

          <div className="border-b border-gray-200 px-6 md:px-8">

            <div className="flex gap-8 overflow-x-auto">


              <button
                type="button"
                className="border-b-2 border-[#c85a00] py-5 text-sm font-semibold text-gray-900"
              >

                Description

              </button>



              <button
                type="button"
                className="py-5 text-sm text-gray-500 hover:text-gray-900"
              >

                Specifications

              </button>



              <button
                type="button"
                className="py-5 text-sm text-gray-500 hover:text-gray-900"
              >

                Reviews ({product.reviews})

              </button>


            </div>

          </div>



          {/* DETAILS CONTENT */}

          <div className="grid grid-cols-1 gap-10 p-6 md:grid-cols-3 md:p-8">


            {/* =================================================
                DESCRIPTION
            ================================================= */}

            <div>

              <h2 className="text-lg font-semibold text-gray-900">

                Product Description

              </h2>


              <p className="mt-4 text-sm leading-7 text-gray-600">

                {product.description}

              </p>

            </div>



            {/* =================================================
                KEY FEATURES
            ================================================= */}

            <div>

              <h2 className="text-lg font-semibold text-gray-900">

                Key Features

              </h2>


              <ul className="mt-4 space-y-3 text-sm text-gray-600">


                <li className="flex gap-2">

                  <Check size={17} />

                  Premium fabric upholstery

                </li>


                <li className="flex gap-2">

                  <Check size={17} />

                  Spacious L-shape design

                </li>


                <li className="flex gap-2">

                  <Check size={17} />

                  Comfortable seating for 4–5 people

                </li>


                <li className="flex gap-2">

                  <Check size={17} />

                  Sturdy wooden frame

                </li>


                <li className="flex gap-2">

                  <Check size={17} />

                  Easy to clean and maintain

                </li>


              </ul>

            </div>



            {/* =================================================
                SPECIFICATIONS
            ================================================= */}

            <div>

              <h2 className="text-lg font-semibold text-gray-900">

                Specifications

              </h2>


              <div className="mt-4 space-y-3 text-sm">


                <div className="flex justify-between border-b border-gray-100 pb-2">

                  <span className="text-gray-500">
                    Material
                  </span>

                  <span className="font-medium">
                    {product.material || "Not specified"}
                  </span>

                </div>



                <div className="flex justify-between border-b border-gray-100 pb-2">

                  <span className="text-gray-500">
                    Color
                  </span>

                  <span className="font-medium">
                    {product.color || "Not specified"}
                  </span>

                </div>



                <div className="flex justify-between border-b border-gray-100 pb-2">

                  <span className="text-gray-500">
                    Room Type
                  </span>

                  <span className="font-medium">
                    {product.roomType?.name || "Not specified"}
                  </span>

                </div>



                <div className="flex justify-between border-b border-gray-100 pb-2">

                  <span className="text-gray-500">
                    Dimensions
                  </span>

                  <span className="font-medium">
                    {product.dimensions
                      ? `${product.dimensions.length || "-"} × ${product.dimensions.width || "-"} × ${product.dimensions.height || "-"} ${product.dimensions.unit || "cm"}`
                      : "Not specified"}
                  </span>

                </div>



                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Warranty
                  </span>

                  <span className="font-medium">
                    2 Years
                  </span>

                </div>


              </div>

            </div>


          </div>

        </div>


      </section>

    </main>

  );

}