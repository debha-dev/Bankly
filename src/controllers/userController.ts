import { Request, Response } from "express";
import {
  signupUserService,
  loginUser,
  deleteAccount,
  updateAccount,
  userDetails
} from "../services/userService";

export const signupUserController = async (req: Request, res: Response): Promise<void> => {
  await signupUserService(req, res); 
};

export const loginUserController = async (req: Request, res: Response): Promise<void> => {
  await loginUser(req, res); 
};

export const deleteAccountController = async (req: Request, res: Response): Promise<void> => {
  await deleteAccount(req, res);
};

export const updateAccountController = async (req: Request, res: Response): Promise<void> => {
  await updateAccount(req, res);
};

export const userDetailsController = async (req: Request, res: Response): Promise<void> => {
  await userDetails(req, res);
};
