import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

import {
  createUser,
  getUserByEmail,
  updateUserLastLogin,
} from "../models/userModel.js";

// ==========================================
// REGISTER USER
// ==========================================
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    // ==========================================
    // VALIDATION
    // ==========================================
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
      });
    }

    // Password validation
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    // ==========================================
    // CHECK EXISTING USER
    // ==========================================
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    // ==========================================
    // HASH PASSWORD
    // ==========================================
    const hashedPassword = await bcrypt.hash(password, 10);

    // ==========================================
    // CREATE USER
    // ==========================================
    const newUser = await createUser({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // ==========================================
    // GENERATE TOKEN
    // ==========================================
    const token = generateToken(newUser);

    // ==========================================
    // SUCCESS RESPONSE
    // ==========================================
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        is_active: 1,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);

    return res.status(500).json({
      success: false,
      message: "Registration failed. Please try again later",
    });
  }
};

// ==========================================
// LOGIN USER
// ==========================================
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // ==========================================
    // VALIDATION
    // ==========================================
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter email and password",
      });
    }

    // ==========================================
    // FIND USER
    // ==========================================
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // ==========================================
    // CHECK PASSWORD
    // ==========================================
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // ==========================================
    // UPDATE LAST LOGIN
    // ==========================================
    await updateUserLastLogin(user.id);

    // ==========================================
    // GENERATE TOKEN
    // ==========================================
    const token = generateToken(user);

    // ==========================================
    // SUCCESS RESPONSE
    // ==========================================
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        is_active: user.is_active,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);

    return res.status(500).json({
      success: false,
      message: "Login failed. Please try again later",
    });
  }
};

// ==========================================
// GET CURRENT USER PROFILE
// ==========================================
export const getCurrentUser = (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    console.error("Get User Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch user profile",
    });
  }
};
