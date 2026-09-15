import RoomModel from "../models/room.model.js";
import {
  sendNotFound,
  sendServerError,
  sendSuccess,
} from "../utils/response.js";

export const read = async (req, res) => {
  try {
    const query = req.query;
    const filter = {};
    const limit = query.limit ? parseInt(query.limit, 10) : 5;

    if (query.status) {
      filter.status = query.status === "true";
    }

    const rooms = await RoomModel.find(filter).limit(limit);
    const totalRooms = await RoomModel.countDocuments(filter);

    return res.status(200).json({
      message: "Room data found",
      success: true,
      data: rooms,
      total: totalRooms,
    });
  } catch (error) {
    return sendServerError(res);
  }
};

export const readById = async (req, res) => {
  try {
    const { id } = req.params;

    const room = await RoomModel.findById(id);

    if (!room) {
      return sendNotFound(res);
    }

    return res.status(200).json({
      message: "Room data found",
      success: true,
      data: room,
    });
  } catch (error) {
    return sendServerError(res);
  }
};

export const create = async (req, res) => {
  try {
    const imageUrl = req.file?.path || "";
    const { name, slug } = req.body;

    if (!name || !slug) {
      return res.status(400).json({
        message: "Name and slug are required",
        success: false,
      });
    }

    const existingRoom = await RoomModel.findOne({ slug });

    if (existingRoom) {
      return res.status(409).json({
        message: "Room already exists",
        success: false,
      });
    }

    await RoomModel.create({
      name,
      slug,
      image: imageUrl,
    });  

    return res.status(201).json({
      message: "Room created successfully",
      success: true,
    });
  } catch (error) {
    return sendServerError(res);
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const room = await RoomModel.findById(id);

    if (!room) {
      return sendNotFound(res);
    }

    await RoomModel.findByIdAndUpdate(id, {
      $set: {
        status: !room.status,
      },
    });

    return sendSuccess(res, "Room status updated successfully");
  } catch (error) {
    return sendServerError(res);
  }
};

export const edit = async (req, res) => {
  try {
    const imageUrl = req.file?.path || "";
    const { name, slug } = req.body;
    const { id } = req.params;

    const room = await RoomModel.findById(id);

    if (!room) {
      return sendNotFound(res);
    }

    if (name) room.name = name;
    if (slug) room.slug = slug;
    if (imageUrl) room.image = imageUrl;

    await room.save();

    return sendSuccess(res, "Room updated successfully");
  } catch (error) {
    return sendServerError(res);
  }
};

export const deleteById = async (req, res) => {
  try {
    const { id } = req.params;

    const room = await RoomModel.findById(id);

    if (!room) {
      return sendNotFound(res);
    }

    await RoomModel.findByIdAndDelete(id);

    return sendSuccess(res, "Room deleted successfully");
  } catch (error) {
    return sendServerError(res);
  }
};  

