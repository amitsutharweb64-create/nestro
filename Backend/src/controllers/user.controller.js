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

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const normalizedEmail = email.trim().toLowerCase();
    const user = await userModel.findOne({ email: normalizedEmail });
    if (user) {
      if (user.isVerified) {
        return sendConflict(res, "This email is already registered. Please sign in instead.");
      }

      const otp = Math.floor(100000 + Math.random() * 900000);
      user.otp = otp;
      user.otpExpire = Date.now() + 3 * 60 * 1000;
      await user.save();
      await sendOtpMail(normalizedEmail, otp);

      return res.status(200).json({
        success: true,
        message: "A new OTP has been sent to your email.",
        email: normalizedEmail,
      });
    }
    const encryptedPass = cryptr.encrypt(password);
    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpire = Date.now() + 3 * 60 * 1000
    await sendOtpMail(normalizedEmail, otp)
    await userModel.create({
      name, email: normalizedEmail, password: encryptedPass, otp, otpExpire
    });

    return res.status(201).json({
      message: "user Account crate",
      success: true,
      email: normalizedEmail
    })

  } catch (error) {
    return sendServerError(res);
  }
};
export const getme = async (req, res) => {
  try {
    const user = req.user;
    console.log(user)

    return res.status(200).json({
      message: "user data find ",
      success: true,
      user
    })
  } catch (error) {
    sendServerError(res)
  }
}

export const otpVarify = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await userModel.findOne({ email: email.trim().toLowerCase() });
    if (!user) return sendNotFound(res, "Account not found.");
    if (user.isVerified) {
      return sendSuccess(res, "Email is already verified.");
    }
    if (user.otp != Number(otp)) return sendBadRequest(res, "Invalid OTP.");
    if (!user.otpExpire || user.otpExpire.getTime() < Date.now()) {
      return sendBadRequest(res, "OTP has expired. Please request a new one.");
    }
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpire = undefined;
    await user.save();

    return sendSuccess(res, "OTP verified successfully.");

  } catch (error) {
    return sendServerError(res);
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendBadRequest(res, "Email and password are required.");
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await userModel.findOne({ email: normalizedEmail });
    if (!user) return sendNotFound(res, "Account not found.");

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
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });

    return sendSuccess(res, "Login successful.");
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

    if (
      !fullName ||
      !mobile ||
      !pincode ||
      !addressLine ||
      !city ||
      !state
    ) {
      return res.status(400).json({
        success: false,
        message: "All required address fields are required",
      });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Agar new address ko default banana hai
    if (isDefault) {
      user.addresses.forEach((address) => {
        address.isDefault = false;
      });
    }

    // Agar user ka first address hai to automatically default
    const makeDefault = user.addresses.length === 0 ? true : !!isDefault;

    user.addresses.push({
      fullName,
      mobile,
      pincode,
      addressLine,
      city,
      state,
      country: country || "India",
      isDefault: makeDefault,
    });

    await user.save();

    return res.status(201).json({
      success: true,
      message: "Address added successfully",
      addresses: user.addresses,
    });
  } catch (error) {
    console.log("Add Address Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
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
        message: "User not found",
      });
    }

    const address = user.addresses.id(addressId);

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    address.deleteOne();

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Address deleted successfully",
      addresses: user.addresses,
    });
  } catch (error) {
    console.log("Delete Address Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// LOGOUT
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });
    return sendSuccess(res, "Logged out successfully");
  } catch (error) {
    return sendServerError(res);
  }
};

// UPDATE PROFILE
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, mobile } = req.body;

    if (!name || !name.trim()) {
      return sendBadRequest(res, "Name is required.");
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      {
        name: name.trim(),
        mobile: mobile ? mobile.trim() : null,
      },
      { new: true }
    ).select("-password -otp -otpExpire");

    if (!updatedUser) {
      return sendNotFound(res, "User not found.");
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      user: updatedUser,
    });
  } catch (error) {
    return sendServerError(res, error);
  }
};
