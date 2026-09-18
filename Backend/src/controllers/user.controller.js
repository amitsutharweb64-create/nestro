import userModel from "../models/user.model.js";
import Cryptr from 'cryptr';
const cryptr = new Cryptr(process.env.SECRET_KEY);
import jwt from 'jsonwebtoken'

import {
  sendBadRequest,
  sendConflict,
  sendNotFound,
  sendServerError,
  sendSuccess,
} from "../utils/response.js";
import sendOtpMail from "../utils/sendOtpmail.js";

const isProduction = process.env.NODE_ENV === "production";
const cookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  path: "/",
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const normalizedEmail = email.trim().toLowerCase();
    const user = await userModel.findOne({ email: normalizedEmail });
    if (user) {
      if (user.isVerified) {
        return sendConflict(res, "This email is already registered. Please sign in instead.");
      }

      // Existing unverified account: refresh OTP and expiry time.
      const otp = Math.floor(100000 + Math.random() * 900000);
      const otpExpire = Date.now() + 3 * 60 * 1000;
      await sendOtpMail(normalizedEmail, otp);

      user.name = name;
      user.password = cryptr.encrypt(password);
      user.otp = otp;
      user.otpExpire = otpExpire;
      await user.save();

      return res.status(200).json({
        success: true,
        message: "A new OTP has been sent to your email.",
        email: normalizedEmail,
      });
    }

    const encryptedPass = cryptr.encrypt(password);
    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpire = Date.now() + 3 * 60 * 1000;

    await sendOtpMail(normalizedEmail, otp);

    await userModel.create({
      name,
      email: normalizedEmail,
      password: encryptedPass,
      otp,
      otpExpire,
    });

    return res.status(201).json({
      message: "User account created successfully. Please verify OTP sent to your email.",
      success: true,
      email: normalizedEmail,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return sendServerError(res, error);
  }
};

export const otpVarify = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const normalizedEmail = email.trim().toLowerCase();
    const user = await userModel.findOne({ email: normalizedEmail });

    if (!user) {
      return sendNotFound(res, "User not found");
    }

    if (user.isVerified) {
      return sendBadRequest(res, "Account is already verified. Please login.");
    }

    if (!user.otp || !user.otpExpire) {
      return sendBadRequest(res, "No active OTP found. Please request a new OTP.");
    }

    if (Date.now() > Number(user.otpExpire)) {
      return sendBadRequest(res, "OTP has expired. Please request a new OTP.");
    }

    if (String(user.otp).trim() !== String(otp).trim()) {
      return sendBadRequest(res, "Invalid OTP.");
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpire = null;
    await user.save();

    return sendSuccess(res, "OTP verified successfully. You can now login.");
  } catch (error) {
    return sendServerError(res, error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = email.trim().toLowerCase();
    const user = await userModel.findOne({ email: normalizedEmail });
    if (!user) {
      return sendNotFound(res, "User not found.");
    }

    const decryptedPassword = cryptr.decrypt(user.password);
    if (password !== decryptedPassword) {
      return sendBadRequest(res, "Incorrect password.");
    }

    if (!user.isVerified) {
      return sendBadRequest(res, "Please verify your email with OTP first.");
    }

    const token = jwt.sign(
      { data: { id: user._id } },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    // Create a session only after all login checks pass.
    res.cookie("token", token, {
      ...cookieOptions,
      maxAge: 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
      },
    });
  } catch (error) {
    return sendServerError(res, error);
  }
};




// ADD ADDRESS
export const addAddress = async (req, res) => {
  try {
    const userId = req.user._id;

    const {
      fullName,
      mobile,
      pincode,
      addressLine,
      city,
      state,
      country,
      isDefault,
    } = req.body;

    if (!fullName || !mobile || !pincode || !addressLine || !city || !state) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required address fields",
      });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (isDefault) {
      user.addresses.forEach(addr => {
        addr.isDefault = false;
      });
    }

    const defaultStatus = user.addresses.length === 0 ? true : Boolean(isDefault);

    user.addresses.push({
      fullName,
      mobile,
      pincode,
      addressLine,
      city,
      state,
      country: country || "India",
      isDefault: defaultStatus,
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: "Address added successfully",
      addresses: user.addresses,
    });

  } catch (error) {
    console.error("Add address error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add address",
      error: error.message
    });
  }
};

// DELETE ADDRESS
export const deleteAddress = async (req, res) => {
  try {
    const userId = req.user._id;
    const { addressId } = req.params;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Check if address exists
    const addressExists = user.addresses.id(addressId);
    if (!addressExists) {
      return res.status(404).json({
        success: false,
        message: "Address not found"
      });
    }

    // Pull address from array
    user.addresses.pull(addressId);

    // If the deleted address was default and other addresses exist, make first one default
    if (addressExists.isDefault && user.addresses.length > 0) {
      user.addresses[0].isDefault = true;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Address deleted successfully",
      addresses: user.addresses
    });

  } catch (error) {
    console.error("Delete address error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete address",
      error: error.message
    });
  }
};

export const getme = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return sendNotFound(res, "User not found");
    }

    return res.status(200).json({
      success: true,
      message: "User found successfully",
      user,
    });
  } catch (error) {
    return sendServerError(res, error);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const user = req.user;
    const { name, mobile } = req.body;

    if (!name || !name.trim()) {
      return sendBadRequest(res, "Name is required");
    }

    user.name = name.trim();
    if (mobile !== undefined) {
      user.mobile = mobile.trim();
    }

    await user.save();

    return sendSuccess(res, "Profile updated successfully", {
      _id: user._id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      role: user.role,
    });
  } catch (error) {
    return sendServerError(res, error);
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      ...cookieOptions,
      maxAge: 0,
    });

    return sendSuccess(res, "Logged out successfully");
  } catch (error) {
    return sendServerError(res, error);
  }
};
