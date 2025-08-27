import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// helper for generating token
const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET, { expiresIn: "15d" });
};

// ====================== TEAM REGISTER ======================
export const registerTeam = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) return res.status(400).json({ message: "Email already exists" });

    const existingUsername = await User.findOne({ username });
    if (existingUsername) return res.status(400).json({ message: "Username already exists" });

    const profileImage = `https://api.dicebear.com/9.x/avataaars/svg?seed=${username}`;

    const user = new User({ email, username, password, profileImage, role: "team" });
    await user.save();

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      message: "Team registered successfully",
      token,
      user: {
        _id: user._id,
        username: user.username,
        role: user.role,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.log("Error in team register:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ====================== TEAM LOGIN ======================
export const loginTeam = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "All fields required" });

    const user = await User.findOne({ email, role: "team" });
    if (!user) return res.status(400).json({ message: "Team user not found" });

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user._id, user.role);

    res.status(200).json({
      message: "Team login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.log("Error in team login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ====================== ADMIN REGISTER ======================
export const registerAdmin = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const existingAdmin = await User.findOne({ role: "admin" });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists!" });
    }
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const admin = new User({
      email,
      username,
      password,
      role: "admin",
      profileImage: `https://api.dicebear.com/9.x/avataaars/svg?seed=${username}`,
    });

    await admin.save();

    const token = generateToken(admin._id, admin.role);

    res.status(201).json({
      message: "Admin registered successfully",
      token,
      user: {
        _id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
        profileImage: admin.profileImage,
      },
    });
  } catch (error) {
    console.log("Error in admin register:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ====================== ADMIN LOGIN ======================
export const loginAdmin = async (req, res) => {
  console.log("Admin login attempt");
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "All fields required" });

    const admin = await User.findOne({ email, role: "admin" });
    if (!admin) return res.status(400).json({ message: "Admin not found" });

    const isPasswordCorrect = await admin.comparePassword(password);
    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(admin._id, admin.role);

    res.status(200).json({
      message: "Admin login successful",
      token,
      user: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
        profileImage: admin.profileImage,
      },
    });
  } catch (error) {
    console.log("Error in admin login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
