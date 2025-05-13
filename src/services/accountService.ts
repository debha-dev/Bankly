import { Request, Response } from "express";
import { Account } from "../models/accountModel";
import { AuthenticatedRequest } from "../middleware/authMiddleware";
import { generateAccountNumber } from "../utils/generateAccountNumber";

export const createAccountService = async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  const userId = req.user?.userId;
  const { accountType, currency } = req.body;

  if (!userId) {
    return res.status(401).json({ error: "User not authenticated" });
  }

  try {
    const account = await Account.create({userId,accountType,currency,accountNumber: generateAccountNumber(),balance: 0.0,status: "active" });
    return res.status(201).json({ success: true, data: account });
  } catch (error) {
    console.error("Create account error:", error);
    return res.status(500).json({ error: "Server error. Please try again later." });
    
  }
};

export const getUserAccountsService = async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  const userId = req.user?.userId;

  if (!userId) {
   return res.status(401).json({ error: "User not authenticated" });
  }

  try {
    const accounts = await Account.findAll({ where: { userId, deleted: false } });
     return res.status(200).json({ success: true, data: accounts });
  } catch (error) {
    console.error("Fetch user accounts error:", error);
    return res.status(500).json({ error: "Server error. Please try again later." });
  }
};

export const getAccountByIdService = async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  const userId = req.user?.userId;
  const { accountId } = req.params;

  if (!userId) {
    return res.status(401).json({ error: "User not authenticated" });
  }

  try {
    const account = await Account.findOne({ where: { id: accountId, userId, deleted: false } });

    if (!account) {
     return res.status(404).json({ error: "Account not found" });
    }

    return res.status(200).json({ success: true, data: account });
  } catch (error) {
    console.error("Get account by ID error:", error);
   return res.status(500).json({ error: "Server error. Please try again later." });
  }
};

export const updateAccountDetailsService = async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  const userId = req.user?.userId;
  const { accountId } = req.params;
  const updates = req.body;

  if (!userId) {
    return res.status(401).json({ error: "User not authenticated" });
  }

  try {
    const account = await Account.findOne({ where: { id: accountId, userId, deleted: false } });
    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }

    await account.update(updates);
    return res.status(200).json({ success: true, message: "Account updated successfully", data: account });
  } catch (error) {
    console.error("Update account details error:", error);
    return res.status(500).json({ error: "Server error. Please try again later." });
  }
};

export const closeAccountService = async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  const userId = req.user?.userId;
  const { accountId } = req.params;

  if (!userId) {
    return res.status(401).json({ error: "User not authenticated" });
  }

  try {
    const account = await Account.findOne({ where: { id: accountId, userId, deleted: false } });
    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }

    await account.update({ deleted: true });
    return res.status(200).json({ success: true, message: "Account closed successfully", data: account });
  } catch (error) {
    console.error("Close account error:", error);
    return res.status(500).json({ error: "Server error. Please try again later." });
  }
};

export const setAccountPinService = async (req: AuthenticatedRequest,res: Response): Promise<Response> => {
  const userId = req.user?.userId;
  const { accountId } = req.params;
  const { pin } = req.body;

  if (!userId) {
    return res.status(401).json({ error: "User not authenticated" });
  }
  if (!pin || typeof pin !== "string" || pin.length !== 4) {
    return res.status(400).json({ error: "PIN must be a 4-digit string" });
  }

  try {
    const account = await Account.findOne({ where: { id: accountId, userId, deleted: false } });
    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }

    await account.update({ pin });
    return res.status(200).json({ success: true, message: "PIN set successfully" });
  } catch (error) {
    console.error("Set PIN error:", error);
    return res.status(500).json({ error: "Server error. Please try again later." });
  }
};
