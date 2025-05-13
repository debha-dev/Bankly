import { hashPassword, verifyPassword } from "../config/bcrypt";
import { generateToken } from "../config/token";
import { User } from "../models/userModel";
import {Request, Response } from "express";
import { AuthenticatedRequest } from "../middleware/authMiddleware";

export const signupUserService = async (req: Request, res: Response) => {
  const userData = req.body;

  try {
    const existingUser = await User.findOne({
      where: {
        email: userData.email,
        deleted: false
      },
    });

    if (existingUser) {
      return res.status(409).json({ info: "User already exists" });
    }
    const hashedPassword = await hashPassword(userData.password);

    const signup = await User.create({
      ...userData,
      password: hashedPassword,
    });

    const createdUser = signup.get({ plain: true});

    const token = generateToken(createdUser.id);

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      userId: createdUser.id,
      token,
    });

  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ error: "Signup server error" });
  }
};

export const loginUser = async (req:Request, res:Response) => {
  const userData = req.body;

  try {
    const user = await User.findOne({
      where: {
        email: userData.email,
        deleted: false,
      }
    });

    if (!user) {
      return res.status(404).json({ error: "User does not exist"});
    }

    const success = await verifyPassword(
      user.dataValues.password,
      userData.password
    );

    if (!success) {
      return res.status(401).json({ error: "Incorrect password"});
    }

    const token = generateToken(user.dataValues.id);

    res.status(200).json({
      success: "Login successful",
      user: user.get({ plain: true}),
      token,
    })
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login server error"})
  }
}

export const deleteAccount = async (req: AuthenticatedRequest, res: Response) => {
 const userId = req.user?.userId;

 if (!userId) {
    return res.status(401).json({ error: "User not authenticated" });
  }

  try {
    const [affectedRows] = await User.update(
      { deleted: true }, 
      { where: { id: userId, deleted: false } } // condition
    );

    if (affectedRows === 0) {
      return res.status(404).json({ error: "User already deleted or not found" });
    }

    return res.status(200).json({ success: "Account deleted successfully" });

  } catch (error) {
    console.error("Delete account error:", error);
    return res.status(500).json({ error: "Delete account server error" });
  }
};

export const updateAccount = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId;
  const userNewData = req.body;

  if (!userId) {
    return res.status(401).json({ error: "User not authenticated" });
  }

  try {
    const userExists = await User.findOne({
      where: { id: userId, deleted: false },
    });

    if (!userExists) {
      return res
        .status(404)
        .json({ error: "User account not found or inactive" });
    }

    const updates: any = {};

    if (userNewData.fullName) {
      updates.fullName = userNewData.fullName;
    }

    if (userNewData.email) {
      updates.email = userNewData.email;
    }

    if (userNewData.password) {
      const hashedPassword = await hashPassword(userNewData.password);
      if (!hashedPassword) {
        return res.status(500).json({ error: "Failed to hash password" });
      }
      updates.password = hashedPassword;
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: "No valid fields provided to update" });
    }

    const updateResult = await User.update(updates, {
      where: { id: userId },
    });

    if (updateResult[0] === 0) {
      return res.status(500).json({ error: "User not updated in the database" });
    }

    res.status(200).json({ success: "User account updated successfully" });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: "Server error from update" });
  }
};

export const userDetails = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId;

  if (!userId) {
    return res.status(401).json({ error: "User not authenticated" });
  }

  try {
    const user = await User.findOne({
      where: {
        id: userId,
        deleted: false,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User does not exist" });
    }

    const userData = user.toJSON();

    res.status(200).json({
      success: true,
      data: {
        fullName: userData.fullName,
        email: userData.email,
      },
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

