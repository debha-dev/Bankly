import { Request, Response } from "express";
import {depositService,withdrawalService,transferService, getTransactionHistoryService,} from "../services/transactionService";
import { AuthenticatedRequest } from "../middleware/authMiddleware";

export const depositController = async (req: AuthenticatedRequest,res: Response): Promise<void> => {
  await depositService(req, res);
};

export const withdrawalController = async (req: AuthenticatedRequest,res: Response): Promise<void> => {
  await withdrawalService(req, res);
};

export const transferController = async (req: AuthenticatedRequest,res: Response): Promise<void> => {
  await transferService(req, res);
};

export const getTransactionHistoryController = async (req: AuthenticatedRequest,res: Response): Promise<void> => {
  await getTransactionHistoryService(req, res);
}