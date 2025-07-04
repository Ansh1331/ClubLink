import Role from "../models/Role.js"
import RoleApplication from "../models/RoleApplication.js"
import User from "../models/User.js"
import { v2 as cloudinary } from "cloudinary"
import { clerkClient } from '@clerk/clerk-sdk-node'

// ✅ Create User (if not exists)
export const createUser = async (req, res) => {
  try {
    const { userId } = req.auth;

    // 1. Check if user already exists in DB
    const existingUser = await User.findById(userId);
    if (existingUser) {
      return res.json({ success: true, user: existingUser });
    }

    // 2. Fetch full Clerk user details
    const clerkUser = await clerkClient.users.getUser(userId);

    // 3. Extract useful fields
    const name = [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(' ');
    const email = clerkUser.emailAddresses[0].emailAddress;
    const image = clerkUser.imageUrl;

    // 4. Create user in MongoDB
    const user = await User.create({
      _id: userId,
      name,
      email,
      image,
      resume: null,
    });

    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get User Data
export const getUserData = async (req, res) => {
  const userId = req.auth.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.json({ success: false, message: 'User Not Found' });
    }

    res.json({ success: true, user });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Apply For Role
export const applyForRole = async (req, res) => {
  const { roleId } = req.body;
  const userId = req.auth.userId;

  try {
    const isAlreadyApplied = await RoleApplication.find({ roleId, userId });

    if (isAlreadyApplied.length > 0) {
      return res.json({ success: false, message: 'Already Applied' });
    }

    const roleData = await Role.findById(roleId);
    if (!roleData) {
      return res.json({ success: false, message: 'Role Not Found' });
    }

    await RoleApplication.create({
      clubId: roleData.clubId,
      userId,
      roleId,
      date: Date.now(),
    });

    res.json({ success: true, message: 'Applied Successfully' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get User Applied Applications Data
export const getUserRoleApplications = async (req, res) => {
  try {
    const userId = req.auth.userId;

    const applications = await RoleApplication.find({ userId })
      .populate('clubId', 'name email image')
      .populate('roleId', 'title location')
      .exec();

    if (!applications) {
      return res.json({ success: false, message: 'No role applications found for this user.' });
    }

    return res.json({ success: true, applications });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Update User Resume
export const updateUserResume = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const resumeFile = req.file;

    const userData = await User.findById(userId);

    if (resumeFile) {
      const resumeUpload = await cloudinary.uploader.upload(resumeFile.path);
      userData.resume = resumeUpload.secure_url;
    }

    await userData.save();

    return res.json({ success: true, message: 'Resume Updated' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
