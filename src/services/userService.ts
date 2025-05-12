import { hashPassword, verifyPassword } from "../config/bcrypt";
import { generateToken } from "../config/token";
import { User } from "../models/userModel";
import {Request, Response } from "express";

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

export const deleteAccount = async (req: Request, res: Response) => {
  const loggedInUser = res.locals.user;
  const userId = loggedInUser.id;

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

export const updateAccount = async (req: Request, res: Response) => {
  const userNewData = req.body;

  const loggedInUser = res.locals.user;
  const userId = loggedInUser.id;

  try {
    const userExists = await User.findOne({
      where: { id: userId, deleted: false },
    });

    if (!userExists) {
      return res
        .status(404)
        .json({ error: "User account not found or inactive" });
    }

    const updateAccount = await User.update(userNewData, {
      where: { id: userId },
    });

    if (updateAccount[0] === 0) {
      return res.status(500).json({ error: "User not updated in the database" });
    }

    res.status(200).json({ success: "User account updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error from update" });
  }
};

export const userDetails = async (req: Request, res: Response) => {
  const loggedInUser = res.locals.user;
  const userId = loggedInUser.id;

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

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};