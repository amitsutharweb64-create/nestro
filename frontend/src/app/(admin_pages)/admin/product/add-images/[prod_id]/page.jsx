"use client";

import React, { use, useEffect, useState } from "react";
import { generateSlug, client } from "@/utils/helper";
import { fetchCategory, fetchProductById, fetchRoomById, fetchRooms } from "@/api/api";
import { toast } from 'sonner';
import { useRouter } from "next/navigation";

export default function AddProduct({ params }) {
    const [product, setProduct] = useState({});
    const { prod_id } = use(params)
    const router = useRouter();

    useEffect(
        () => {
            const fetchAPI = async () => {
                try {

                    const product_response = await fetchProductById(prod_id)
                    console.log(product_response)
                    if (product_response.success) {
                        setProduct(product_response.data)
                    }

                } catch (error) {
                    console.log(error)
                }

            }

            fetchAPI()
        },
        [prod_id]
    )


    console.log(product, "product")




    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = new FormData();
        for (const img of e.target.images.files) {
            payload.append("images", img)
        }

        try {
            const response = await client.patch(`product/add-images/${prod_id}`, payload);
            if (response.data.success) {
                toast.success(response.data.message);
                router.push("/admin/product")
            }

        }
        catch (error) {
            toast.error(error.response.data.message || "Internal server error")
        }

    };




    return (

        <div className="max-w-7xl mx-auto p-8  text-black min-h-screen">

            <div className="bg-[#1a2e43] shadow border border-white/10 rounded-xl">

                <div className="border-b border-white/10 p-6">

                    <h1 className="text-2xl font-bold text-white">
                        Add Product Images
                    </h1>

                    <p className="text-sm text-gray-400 mt-1">
                        Fill all product information.
                    </p>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="p-6 space-y-10"
                >

                    <section>

                        <h2 className="text-lg font-semibold mb-5 text-white">
                            Product Image
                        </h2>

                        <div className="grid grid-cols-2 gap-6 items-start">

                            <div className="col-span-2">

                                <label className="block text-sm font-medium mb-2 text-gray-300">
                                    Thumbnail Image
                                </label>

                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    name="images"
                                    className="w-full border border-white/10 bg-[#132437] text-gray-300 rounded-lg px-4 py-3 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-sky-600 file:text-white hover:file:bg-sky-500 file:cursor-pointer cursor-pointer"
                                />

                            </div>

                            <div>


                                <div className="w-52 h-52 border  gap-4 border-white/10 rounded-lg overflow-hidden bg-[#132437] flex items-center justify-center">

                                    {
                                        product?.images ? (

                                            product?.images.map((img, index) => (
                                                <img
                                                    key={`${img}-${index}`}
                                                    src={img}
                                                    alt="Preview"
                                                    className="w-full h-full object-cover"
                                                />
                                            ))

                                        ) : (

                                            <span className="text-gray-500 text-sm">
                                                No Image
                                            </span>

                                        )
                                    }

                                </div>

                            </div>

                        </div>

                    </section>


                    <section className="border-t border-white/10 pt-6">

                        <button
                            type="submit"
                            className="bg-sky-600 text-white px-8 py-3 rounded-lg hover:bg-sky-500 transition"
                        >
                            Create Product
                        </button>

                    </section>

                </form>

            </div>

        </div>

    );

}
