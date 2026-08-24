"use client";

import React, { useEffect, useState } from "react";
import { generateSlug, client, getImageValidationError } from "@/utils/helper";
import { fetchCategory, fetchRooms } from "@/api/api";
import { useRouter } from "next/navigation";
import {  toast } from 'sonner'

export default function AddProduct() {
      const router = useRouter();

    const initialState = {
        title: "",
        slug: "",
        shortDescription: "",
        description: "",

        category: "",
        roomType: "",

        price: "",
        salePrice: "",
        discount: "",

        stock: true,

        material: "Wood",
        color: "",

        length: "",
        width: "",
        height: "",

        weight: "",

        featured: false,
        bestSeller: false,
        newArrival: false,
        status: true,

        thumbnail: null,
    };

    const [data, setData] = useState(initialState);
    const [preview, setPreview] = useState(""); 
    const [category ,setCategory] = useState([]);
    const [room ,setRooms] = useState([]);

  useEffect(() => {
  const fetchAPI = async () => {
    try {
      const [category_response, room_response] = await Promise.all([
                  await fetchCategory(),  
                  await fetchRooms(),  
      ]) 
       if(category_response.success){
            setCategory(category_response.data)
       }
       if(room_response.success){
            setRooms(room_response.data)
       }

    
    } catch (error) {
      console.log(error);
    }
  };

  fetchAPI();
}, []);

   
    // Text / Number / Select
    const handleChange = (e) => {
        const { name, value } = e.target;

        setData((prev) => {
            const next = {
                ...prev,
                [name]: value,
                ...(name === "title" && {
                    slug: generateSlug(value),
                }),
            };

            if (name === "price" || name === "salePrice") {
                const price = Number(next.price);
                const salePrice = Number(next.salePrice);

                next.discount =
                    price > 0 && next.salePrice !== "" && salePrice >= 0
                        ? Math.max(
                            0,
                            Math.round(((price - salePrice) / price) * 100)
                        )
                        : 0;
            }

            return next;
        });
    };

    // Thumbnail
    const handleThumbnail = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        const validationError = getImageValidationError(file);
        if (validationError) {
            toast.error(validationError);
            e.target.value = "";
            return;
        }
           
        setData((prev) => ({
            ...prev,
            thumbnail: file,
        }));

        setPreview(URL.createObjectURL(file));
    };

    // Switch
    const toggleSwitch = (field) => {
        setData((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = new FormData(); 

        Object.keys(data).forEach((key)=>{
            payload.append(key, data[key])
        })  
        try{
           const response = await client.post("/product/create", payload);
          if(response.data.success){
              toast.success(response.data.message);
              
              router.push("/admin/product")
          }
       }catch (error) {
        
          console.error("Product create error:", error);
          toast.error(
            error.response?.data?.message ||
            error.message ||
            "Internal server error"
          );
       }

    };

    return (

        <div className="max-w-7xl mx-auto p-8">

            <div className="bg-white border rounded-xl">

                <div className="border-b p-6">

                    <h1 className="text-2xl font-bold">
                        Add Product
                    </h1>

                    <p className="text-sm text-gray-500 mt-1">
                        Fill all product information.
                    </p>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="p-6 space-y-10"
                >

                    {/* Basic Information */}

                    <section>

                        <h2 className="font-semibold text-lg mb-5">
                            Basic Information
                        </h2>

                        <div className="grid grid-cols-2 gap-5">

                            <div>

                                <label className="text-sm font-medium block mb-2">
                                    Product Title
                                </label>

                                <input
                                    type="text"
                                    name="title"
                                    value={data.title}
                                    onChange={handleChange}
                                    required
                                    className="w-full border rounded-lg px-4 py-3 outline-none"
                                />

                            </div>

                            <div>

                                <label className="text-sm font-medium block mb-2">
                                    Slug
                                </label>

                                <input
                                    type="text"
                                    name="slug"
                                    value={data.slug}
                                    onChange={handleChange}
                                    required
                                    className="w-full border rounded-lg px-4 py-3 outline-none"
                                />

                            </div>

                        </div>

                        <div className="mt-5">

                            <label className="text-sm font-medium block mb-2">
                                Short Description
                            </label>

                            <textarea
                                rows={3}
                                name="shortDescription"
                                value={data.shortDescription}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-4 outline-none resize-none"
                            />

                        </div>

                        <div className="mt-5">

                            <label className="text-sm font-medium block mb-2">
                                Description
                            </label>

                            <textarea
                                rows={6}
                                name="description"
                                value={data.description}
                                onChange={handleChange}
                                required
                                className="w-full border rounded-lg p-4 outline-none resize-none"
                            />

                        </div>

                    </section>

                                        {/* Category */}

                    <section>

                        <h2 className="text-lg font-semibold mb-5">
                            Category Information
                        </h2>

                        <div className="grid grid-cols-2 gap-5">

                            <div>

                                <label className="block text-sm font-medium mb-2">
                                    Category
                                </label>

                                <select
                                    name="category"
                                    value={data.category}
                                    onChange={handleChange}
                                    required
                                    className="w-full border rounded-lg px-4 py-3 outline-none"
                                >
                                    <option value="">Select Category</option>

                                    {/* Map Category Here */}

                                

                                    {
                                        category.map(category=>(
                                            <option
                                                key={category._id}
                                                value={category._id}
                                            >
                                                {category.name}
                                            </option>
                                        ))
                                    }

                            

                                </select>

                            </div>

                            <div>

                                <label className="block text-sm font-medium mb-2">
                                    Room Type
                                </label>

                                <select
                                    name="roomType"
                                    value={data.roomType}
                                    onChange={handleChange}
                                    required
                                    className="w-full border rounded-lg px-4 py-3 outline-none"
                                >
                                    <option value="">
                                        Select Room Type
                                    </option>

                                    {/* Map Room Types */} 
                                         {
                                        room.map(room=>(
                                            <option
                                                key={room._id}
                                                value={room._id}
                                            >
                                                {room.name}
                                            </option>
                                        ))
                                    }

                                </select>

                            </div>

                        </div>

                    </section>





                    {/* Pricing */}

                    <section>

                        <h2 className="text-lg font-semibold mb-5">
                            Pricing
                        </h2>

                        <div className="grid grid-cols-3 gap-5">

                            <div>

                                <label className="block text-sm font-medium mb-2">
                                    Price
                                </label>

                                <input
                                    type="number"
                                    name="price"
                                    value={data.price}
                                    onChange={handleChange}
                                    min="200"
                                    required
                                    className="w-full border rounded-lg px-4 py-3 outline-none"
                                />

                            </div>

                            <div>

                                <label className="block text-sm font-medium mb-2">
                                    Sale Price
                                </label>

                                <input
                                    type="number"
                                    name="salePrice"
                                    value={data.salePrice}
                                    onChange={handleChange}
                                    min="0"
                                    className="w-full border rounded-lg px-4 py-3 outline-none"
                                />

                            </div>

                            <div>

                                <label className="block text-sm font-medium mb-2">
                                    Discount %
                                </label>

                                <input
                                    type="number"
                                    name="discount"
                                    value={data.discount}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-4 py-3 outline-none"
                                />

                            </div>

                        </div>

                    </section>





                    {/* Furniture Details */}

                    <section>

                        <h2 className="text-lg font-semibold mb-5">
                            Furniture Details
                        </h2>

                        <div className="grid grid-cols-2 gap-5">

                            <div>

                                <label className="block text-sm font-medium mb-2">
                                    Material
                                </label>

                                <select
                                    name="material"
                                    value={data.material}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-4 py-3 outline-none"
                                >
                                    <option>Wood</option>
                                    <option>Sheesham</option>
                                    <option>Engineered Wood</option>
                                    <option>Metal</option>
                                    <option>Steel</option>
                                    <option>Plastic</option>
                                    <option>Glass</option>
                                    <option>Marble</option>
                                    <option>Fabric</option>
                                    <option>Leather</option>
                                </select>

                            </div>

                            <div>

                                <label className="block text-sm font-medium mb-2">
                                    Color
                                </label>

                                <input
                                    type="text"
                                    name="color"
                                    value={data.color}
                                    onChange={handleChange}
                                    placeholder="Walnut"
                                    className="w-full border rounded-lg px-4 py-3 outline-none"
                                />

                            </div>

                        </div>





                        <div className="grid grid-cols-4 gap-5 mt-5">

                            <div>

                                <label className="block text-sm font-medium mb-2">
                                    Length
                                </label>

                                <input
                                    type="number"
                                    name="length"
                                    value={data.length}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-4 py-3 outline-none"
                                />

                            </div>

                            <div>

                                <label className="block text-sm font-medium mb-2">
                                    Width
                                </label>

                                <input
                                    type="number"
                                    name="width"
                                    value={data.width}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-4 py-3 outline-none"
                                />

                            </div>

                            <div>

                                <label className="block text-sm font-medium mb-2">
                                    Height
                                </label>

                                <input
                                    type="number"
                                    name="height"
                                    value={data.height}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-4 py-3 outline-none"
                                />

                            </div>

                            <div>

                                <label className="block text-sm font-medium mb-2">
                                    Weight (Kg)
                                </label>

                                <input
                                    type="number"
                                    name="weight"
                                    value={data.weight}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-4 py-3 outline-none"
                                />

                            </div>

                        </div>

                    </section>
                                        {/* Thumbnail */}

                    <section>

                        <h2 className="text-lg font-semibold mb-5">
                            Product Thumbnail
                        </h2>

                        <div className="grid grid-cols-2 gap-6 items-start">

                            <div>

                                <label className="block text-sm font-medium mb-2">
                                    Thumbnail Image
                                </label>

                                <input
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp"
                                    onChange={handleThumbnail}
                                    required
                                    className="w-full border rounded-lg px-4 py-3"
                                />

                            </div>

                            <div>

                                <label className="block text-sm font-medium mb-2">
                                    Preview
                                </label>
   
                                <div className="w-52 h-52 border rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
                           {/* //isko URL wale systum se bi ker sakte hai              */}
                                    {
                                        preview ? (

                                            <img
                                                src={preview}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                            />

                                        ) : (

                                            <span className="text-gray-400 text-sm">
                                                No Image Selected
                                            </span>

                                        )
                                    }

                                </div>

                            </div>

                        </div>

                    </section>



                    {/* Product Flags */}

                    <section>

                        <h2 className="text-lg font-semibold mb-5">
                            Product Settings
                        </h2>

                        <div className="grid grid-cols-2 gap-5">

                            <label className="flex items-center justify-between border rounded-lg px-5 py-4 cursor-pointer">

                                <span>In Stock</span>

                                <input
                                    type="checkbox"
                                    checked={data.stock}
                                    onChange={() => toggleSwitch("stock")}
                                    className="h-5 w-5"
                                />

                            </label>



                            <label className="flex items-center justify-between border rounded-lg px-5 py-4 cursor-pointer">

                                <span>Featured Product</span>

                                <input
                                    type="checkbox"
                                    checked={data.featured}
                                    onChange={() => toggleSwitch("featured")}
                                    className="h-5 w-5"
                                />

                            </label>



                            <label className="flex items-center justify-between border rounded-lg px-5 py-4 cursor-pointer">

                                <span>Best Seller</span>

                                <input
                                    type="checkbox"
                                    checked={data.bestSeller}
                                    onChange={() => toggleSwitch("bestSeller")}
                                    className="h-5 w-5"
                                />

                            </label>



                            <label className="flex items-center justify-between border rounded-lg px-5 py-4 cursor-pointer">

                                <span>New Arrival</span>

                                <input
                                    type="checkbox"
                                    checked={data.newArrival}
                                    onChange={() => toggleSwitch("newArrival")}
                                    className="h-5 w-5"
                                />

                            </label>



                            <label className="flex items-center justify-between border rounded-lg px-5 py-4 cursor-pointer">

                                <span>Active Status</span>

                                <input
                                    type="checkbox"
                                    checked={data.status}
                                    onChange={() => toggleSwitch("status")}
                                    className="h-5 w-5"
                                />

                            </label>

                        </div>

                    </section>



                    {/* Submit */}

                    <section className="border-t pt-6">

                        <button
                            type="submit"
                            className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition"
                        >
                            Create Product
                        </button>

                    </section>

                </form>

            </div>

        </div>

    );

}
