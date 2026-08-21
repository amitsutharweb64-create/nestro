import ProductModel from "../models/product.model.js";
import CategoryModel from "../models/category.model.js";
import roomModel from "../models/room.model.js";
import {
  sendBadRequest,
  sendConflict,
  sendCreated,
  sendNotFound,
  sendServerError,
  sendSuccess,
} from "../utils/response.js";

export const read = async (req, res) => {
  try {
    //qwey ka hmesa data type string hota hai
    const query = req.query;
    console.log(query);
    const filter = {};
    const sortFilter = {};
    const limit = query.limit ? parseInt(query.limit) : 2;
    const page = query.page || 1;
    const skip = (page - 1) * limit;

    if (query.best_seller) {
      filter.bestSeller = query.best_seller === "true"; //qwery ko boolian me convert ker dega
    }

    if (query.status) {
      filter.status = query.status === "true"; //qwery ko boolian me convert ker dega
    }

    if (query.stock) {
      filter.stock = query.stock === "true"; //qwery ko boolian me convert ker dega
    }
    if (query.stock) {
      filter.stock = query.stock === "true"; //qwery ko boolian me convert ker dega
    }

    if (query.new_arrival) {
      filter.newArrival = query.new_arrival === "true"; //qwery ko boolian me convert ker dega
    }  

     if (query.featured) {
  filter.featured = query.featured === "true";
}

    if (query.id) {
      filter._id = query.id;
    }
    if (query.sort) {
      if (query.sort == "asc") {
        sortFilter.salePrice = 1;
      } else if (query.sort == "dec") {
        sortFilter.salePrice = -1;
      }
    } else sortFilter.createdAt = 1;

  
    if (query.category) {
      const categoryArray = query.category.split(",");
      //slug to id
      const category = await CategoryModel.find({
        slug: { $in: categoryArray },
      }).select("_id");
      filter.category = { $in: category.map((c) => c._id) };
    }  
    
    if (query.room) {
      const roomArray = query.room.split(",");
      //slug to id
      const room = await roomModel
        .find({ slug: { $in: roomArray } })
        .select("_id");
      filter.roomType = {
        $in: room.map((r) => r._id),
      };
    }      
    
     if(query.min_price && query.max_price ){
            const min_price = parseInt(query.min_price);
        const max_price = parseInt(query.max_price);
          filter.salePrice={$gte:min_price ,$lte:max_price }
     }


    

    console.log(filter);
    const product = await ProductModel.find(filter)
      .populate("category")
      .populate("roomType")
      .limit(limit)
      .skip(skip)
      .sort(sortFilter);

    const countDocument = await ProductModel.countDocuments();

    res.status(200).json({
      success: true,
      message: "Product data found",
      data: product,
      total: countDocument,
      limit,
      pages: Math.ceil(countDocument / limit),
    });
  } catch (error) {
    sendServerError(res);
  }
};

export const readById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await ProductModel.findById(id);

    if (!product) return sendNotFound(res);

    res.status(200).json({
      success: true,
      message: "Product found",
      data: product,
    });
  } catch (error) {
    sendServerError(res);
  }
};

export const create = async (req, res) => {
  try {
    const imageUrl = req.file?.path || "";

    const {
      title,
      slug,
      shortDescription,
      description,
      category,
      roomType,
      price,
      salePrice,
      discount,
      stock,
      material,
      color,
      featured,
      bestSeller,
      newArrival,
    } = req.body;

    const requiredFields = {
      title,
      slug,
      description,
      category,
      roomType,
      price,
    };
    const missingFields = Object.entries(requiredFields)
      .filter(
        ([, value]) =>
          value === undefined || value === null || String(value).trim() === "",
      )
      .map(([field]) => field);

    if (!imageUrl) {
      missingFields.push("thumbnail");
    }

    if (missingFields.length > 0) {
      return sendBadRequest(
        res,
        `Required fields missing: ${missingFields.join(", ")}`,
      );
    }

    const numericPrice = Number(price);
    const numericSalePrice =
      salePrice === undefined || salePrice === ""
        ? numericPrice
        : Number(salePrice);

    if (!Number.isFinite(numericPrice) || numericPrice < 200) {
      return sendBadRequest(res, "Price must be at least 200");
    }

    if (!Number.isFinite(numericSalePrice) || numericSalePrice < 0) {
      return sendBadRequest(res, "Sale price must be a valid number");
    }

    const product = await ProductModel.findOne({ slug });

    if (product) return sendConflict(res);

    const calculatedDiscount =
      numericSalePrice < numericPrice
        ? Math.round(((numericPrice - numericSalePrice) / numericPrice) * 100)
        : 0;
    const toBoolean = (value) => value === true || value === "true";

    await ProductModel.create({
      title: title.trim(),
      slug: slug.trim(),
      shortDescription,
      description,
      category,
      roomType,
      price: numericPrice,
      salePrice: numericSalePrice,
      discount: calculatedDiscount,
      stock: toBoolean(stock),
      material,
      color,
      featured: toBoolean(featured),
      bestSeller: toBoolean(bestSeller),
      newArrival: toBoolean(newArrival),
      thumbnail: imageUrl,
    });

    sendCreated(res, "Product created successfully");
  } catch (error) {
    sendServerError(res, error);
  }
};

export const edit = async (req, res) => {
  try {
    const { id } = req.params;

    const imageUrl = req.file?.path || "";

    const product = await ProductModel.findById(id);

    if (!product) return sendNotFound(res);

    Object.assign(product, req.body);

    if (imageUrl) product.thumbnail = imageUrl;

    await product.save();

    sendSuccess(res, "Product updated");
  } catch (error) {
    sendServerError(res);
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await ProductModel.findById(id);

    if (!product) return sendNotFound(res);

    product.status = !product.status;

    await product.save();

    sendSuccess(res, "Product status updated");
  } catch (error) {
    sendServerError(res);
  }
};

export const deleteById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await ProductModel.findById(id);

    if (!product) return sendNotFound(res);

    await ProductModel.findByIdAndDelete(id);

    sendSuccess(res, "Product deleted successfully");
  } catch (error) {
    sendServerError(res);
  }
};

export const updateFlag = async (req, res) => {
  try {
    const { id } = req.params;
    const { field } = req.body;

    const allowedFields = ["stock", "featured", "bestSeller", "newArrival"];

    if (!allowedFields.includes(field)) {
      return sendBadRequest(res, "Invalid field");
    }

    const product = await ProductModel.findById(id);

    if (!product) {
      return sendNotFound(res);
    }

    product[field] = !product[field];

    await product.save();

    return sendSuccess(res, `${field} updated successfully`);
  } catch (error) {
    sendServerError(res);
  }
};

export const addImages = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await ProductModel.findById(id);

    if (!product) return sendNotFound(res);

    // Existing Images
    const oldImages = product.images || [];

    // Newly Uploaded Images
    const newImages = req.files?.map((file) => file.path) || [];

    // Merge Old + New
    const updatedImages = [...oldImages, ...newImages];

    // Maximum 6 Images
    if (updatedImages.length > 6) {
      return res.status(400).json({
        success: false,
        message: "Maximum 6 images are allowed.",
      });
    }

    product.images = updatedImages;

    await product.save();

    return sendSuccess(res);
  } catch (error) {
    console.error(error);
    return sendServerError(res);
  }
};
