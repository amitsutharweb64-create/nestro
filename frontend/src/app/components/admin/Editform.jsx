'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Tag, Link2, Save } from 'lucide-react';
import { client, generateSlug } from '@/utils/helper';
import {  toast } from 'sonner'
import { useRouter } from 'next/navigation'; 

export default function CategoryEditForm({data , api}) { 
      const router = useRouter();
    const [formData, setFormData] = useState({
        name: data.name || "",
        slug: data.slug || "" ,
        image: data.image || ""
    });

    const handleChange = ({ target }) => { 
        
        const { name, value } = target;
//call baack me prev dete hai to last state ki value aa jati  hai 
        setFormData((prev) => ({
            ...prev,
            [name]: value,
            slug: name === 'name' ? generateSlug(value) : prev.slug,
        }));
    };
     //yha se image upload ka code likhna hai  
  const imageHandler = (e) => { 
     setFormData({...formData,image:e.target.files[0]})
  }
        

    const handleSubmit = async (e) => {
        e.preventDefault();
       try {  

        //ye isliye banaya ki brodser per direct file nhi bhej sakte hai 
          const  payload = new FormData();
          payload.append("name",formData.name)
          payload.append("slug",formData.slug)
          if (formData.image instanceof File) {
            payload.append("image", formData.image)
          }
          //yha tak 
          const response = await client.put(api , payload);
          if(response.data.success){
              toast.success(response.data.message);
             
              router.push("/admin/category")
          }
       } catch (error) {
        
          toast.error(error.response?.data?.message || "internal server error")
       }

    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            {/* Heading */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">
                    Edit Category
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Update the selected category
                </p>
            </div>

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >

                <div className="p-6 space-y-6">
                    <div className='w-full grid grid-cols-2 gap-4'>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-800">
                                Category Name <span className="text-red-500">*</span>
                            </label>

                            <div className="relative">
                                <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g. Electronics"
                                    className="w-full pl-10 pr-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-400 focus:bg-white"
                                />
                            </div>

                            <p className="text-xs text-gray-400">
                                This is the category name shown to customers.
                            </p>
                        </div>


                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-800">
                                Slug
                            </label>

                            <div className="relative">
                                <Link2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

                                <input
                                    type="text"
                                    value={formData.slug}
                                    readOnly
                                    placeholder="auto-generated-slug"
                                    className="w-full pl-10 pr-4 py-3 text-sm bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed"
                                />
                            </div>

                            <p className="text-xs text-gray-400">
                                Auto generated from category name.
                            </p>
                        </div>

                    </div>
                    {/* Image Placeholder */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-800">
                            Category Image
                        </label>  
                        <input type="file" name='image' onChange={imageHandler} className="flex items-center justify-center w-full h-20 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50" />

                        <div> 
                            {
                               formData.image &&  
                               <img src={formData.image} className='w-20 h-20' alt="" />
                            }
                            <p className="text-sm text-gray-400">
                                Image upload will be added later
                            </p>
                        </div>
                    </div>

                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50">

                    <Link
                        href="/admin/category"
                        className="px-6 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50"
                    >
                        Cancel
                    </Link>

                    <button
                        type="submit"
                        className="inline-flex cursor-pointer items-center gap-2 px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold rounded-xl"
                    >
                        <Save className="w-4 h-4" />
                        Edit Category
                    </button>

                </div>

            </form>

        </div>
    );
}
