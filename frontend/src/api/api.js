import { client } from "@/utils/helper";  





export const fetchProducts = async ({category ,room,stock ,min_price,max_price,page,limit,best_seller,new_arrival,featured,status} = {}) => {
  try {  
        const params = new URLSearchParams();
        if(category != null) params.append("category" , category);
        if(room != null) params.append("room" , room);
        if(stock != null) params.append("stock" , stock);
        if(page != null) params.append("page" , page); 
        if(limit != null) params.append("limit",limit);
        if (best_seller != null) params.append("best_seller", best_seller);
if (new_arrival != null) params.append("new_arrival", new_arrival);
if (featured != null) params.append("featured", featured);
if (status != null) params.append("status", status);
        if(min_price != null && max_price != null) {
          params.append("min_price" , min_price);
         params.append("max_price" ,max_price);  
        }
       
    const response = await client.get(`/product?${params.toString()}`);

    if (response.data.success) {
      return response.data;
    }

    return {
      data: [],
      success: false,
      message: response.data.message || "Unable to fetch products",
    };
  } catch (error) {
    return {
      data: [],
      success: false,
      message:
        error.response?.data?.message ||
        "Unable to connect to the product API",
    };
  }
};  


export const fetchProductById = async (id) => {
  try {
    const response = await client.get(`/product/${id}`);

    if (response.data.success) {
      return response.data;
    }

    return {
      data: [],
      success: false,
      message: response.data.message || "Unable to fetch products",
    };
  } catch (error) {
    return {
      data: [],
      success: false,
      message:
        error.response?.data?.message ||
        "Unable to connect to the product API",
    };
  }
};


export const fetchCategory = async ({ status, limit } = {}) => {
  try {
    const response = await client.get("/category", {
      params: {
        ...(status !== undefined && { status }),
        ...(limit !== undefined && { limit }),
      },
    });

    if (response.data.success) {
      return response.data;
    }

    return {
      data: [],
      success: false,
      message: response.data.message || "Unable to fetch categories",
    };
  } catch (error) {
    return {
      data: [],
      success: false,
      message:
        error.response?.data?.message ||
        "Unable to connect to the category API",
    };
  }
};

export const fetchCategoryById = async (id) => {
  try {
    const response = await client.get(`/category/${id}`);

    if (response.data.success) {
      return response.data;
    }
  } catch (error) {
    return {
      data: {},
      success: false,
      message:"Internal Server Error"
    };
  }
};

//    inko server side direct call  ker saskte hai 
//    and 
//    client side inko udeeffect se used ker sakte hai and
//    bad me data aayega usko state me dalna hoga and f ir ho jayega 
  



export const fetchRooms = async ({ status, limit } = {}) => {
  try {
    const response = await client.get("/room-type", {
      params: {
        ...(status !== undefined && { status }),
        ...(limit !== undefined && { limit }),
      },
    });

    if (response.data.success) {
      return response.data;
    }
  } catch (error) {
    return {
      data: [],
      success: false,
    };
  }
};

export const fetchRoomById = async (id) => {
  try {
    const response = await client.get(`/room-type/${id}`);

    if (response.data.success) {
      return response.data;
    }
  } catch (error) {
    return {
      data: {},
      success: false,
      message:"Internal Server Error"
    };
  }
};   

export const getme = async () => {
  try {
    const { cookies } = await import("next/headers");
    const cookie = await cookies();
    const token = cookie.get("token")?.value;
    const response = await client.get("user/get-me", {
      headers: {
        Authorization: token,
      },
    });

    return response.data;
  } catch (error) {
    return {
      message: "not found",
      success: false,
      user: null,
    };
  }
};

export const fetchInquiries = async ({ page = 1, limit = 10, search = "", subject = "", status = "" } = {}) => {
  try {
    const params = new URLSearchParams();
    if (page) params.append("page", page);
    if (limit) params.append("limit", limit);
    if (search) params.append("search", search);
    if (subject && subject !== "all") params.append("subject", subject);
    if (status && status !== "all") params.append("status", status);

    const response = await client.get(`/contact?${params.toString()}`);
    if (response.data.success) {
      return response.data;
    }

    return {
      data: [],
      success: false,
      message: response.data.message || "Failed to fetch inquiries",
    };
  } catch (error) {
    return {
      data: [],
      success: false,
      message: error.response?.data?.message || "Failed to connect to contact inquiries API",
    };
  }
};

export const fetchInquiryById = async (id) => {
  try {
    const response = await client.get(`/contact/${id}`);
    if (response.data.success) {
      return response.data;
    }

    return {
      data: null,
      success: false,
      message: response.data.message || "Failed to fetch inquiry details",
    };
  } catch (error) {
    return {
      data: null,
      success: false,
      message: error.response?.data?.message || "Failed to connect to inquiry API",
    };
  }
};

export const updateUserProfile = async ({ name, mobile }) => {
  try {
    const response = await client.put("/user/update-profile", { name, mobile });
    return response.data;
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message || "Failed to update profile",
    };
  }
};



