import { Request, Response } from "express";
import {createAccountService,getUserAccountsService,getAccountByIdService,updateAccountDetailsService,closeAccountService, setAccountPinService,} from "../services/accountService";
import { AuthenticatedRequest } from "../middleware/authMiddleware";

export const createAccountController = async (req: AuthenticatedRequest,res: Response): Promise<void> => {
  await createAccountService(req, res);
};

export const getUserAccountsController = async (req: AuthenticatedRequest,res: Response): Promise<void> => {
  await getUserAccountsService(req, res);
};

export const getAccountByIdController = async (req: AuthenticatedRequest,res: Response): Promise<void> => {
  await getAccountByIdService(req, res);
};

export const updateAccountDetailsController = async (req: AuthenticatedRequest,res: Response): Promise<void> => {
  await updateAccountDetailsService(req, res);
};

export const closeAccountController = async (req: AuthenticatedRequest,res: Response): Promise<void> => {
  await closeAccountService(req, res);
};

export const setAccountPinController = async (req: AuthenticatedRequest,res: Response): Promise<void> => {
    await setAccountPinService(req,res);
}