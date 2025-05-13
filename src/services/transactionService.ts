import { Request, Response } from "express";
import { Transaction } from "../models/transactionModel";
import { Account } from "../models/accountModel";
import { AuthenticatedRequest } from "../middleware/authMiddleware";
import { sequelize } from "../config/databaseConfig";
import { Op } from "sequelize";
import { runFraudDetection } from "./fraudDetectionService";
import { FraudLog } from "../models/fraudLogModel"


export const depositService = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response> => {
  const userId = req.user?.userId;
  const { accountId } = req.params;
  const { amount, description } = req.body;

  if (!userId) {
    return res.status(401).json({ error: "User not authenticated" });
  }
  if (!amount || amount <= 0) {
    return res.status(400).json({ error: "Amount must be greater than zero" });
  }

  try {
    return await sequelize.transaction(async (t) => {
      const account = await Account.findOne({
        where: { id: accountId, userId, deleted: false },
        transaction: t,
      });

      if (!account) {
        return res.status(404).json({ error: "Account not found" });
      }

      const before = Number(account.balance);
      const after = before + amount;

      await account.update({ balance: after }, { transaction: t });
      await Transaction.create(
        {
          accountId,
          type: "deposit",
          amount,
          balanceBefore: before,
          balanceAfter: after,
          description,
        },
        { transaction: t }
      );

      return res.status(200).json({
        success: true,
        data: { balance: after },
      });
    });
  } catch (error: any) {
    console.error("Deposit error:", error);
    const status = error.status ?? 500;
    const message = error.message ?? "Server error during deposit";
    return res.status(status).json({ error: message });
  }
};

export const withdrawalService = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response> => {
  const userId = req.user?.userId;
  const { accountId } = req.params;
  const { amount, description } = req.body;

  if (!userId) {
    return res.status(401).json({ error: "User not authenticated" });
  }
  if (!amount || amount <= 0) {
    return res.status(400).json({ error: "Amount must be greater than zero" });
  }

  try {
    return await sequelize.transaction(async (t) => {
      const account = await Account.findOne({
        where: { id: accountId, userId, deleted: false },
        transaction: t,
      });

      if (!account) {
        return res.status(404).json({ error: "Account not found" });
      }

      const before = Number(account.balance);
      if (before < amount) {
        return res.status(400).json({ error: "Insufficient funds" });
      }
      const accountAge = Math.floor(
        (Date.now() - new Date(account.createdAt).getTime()) / (1000 * 60 * 60 * 24)
      );
      
      const frequency = await Transaction.count({
        where: {
          accountId: account.id,
          createdAt: {
            [Op.gte]: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          },
        },
      });
      
      const prediction = await runFraudDetection({
        userId,
        amount,
        accountAge,
        frequency,
      });
      
      if (prediction.label === "fraud" && prediction.score > 0.8) {
        await FraudLog.create({
          userId,
          accountId: account.id,
          amount,
          type: "withdrawal",
          reason: `AI flagged with score ${prediction.score}`,
        });
        
        return res.status(403).json({ error: "Transaction flagged as fraudulent and blocked." });}
        
        const after = before - amount;
        await account.update({ balance: after }, { transaction: t });
        await Transaction.create(
          {
            accountId,
            type: "withdrawal",
            amount,
            balanceBefore: before,
            balanceAfter: after,
            description,
          },
          { transaction: t }
        );

      return res.status(200).json({
        success: true,
        data: { balance: after },
      });
    });
  } catch (error: any) {
    console.error("Withdrawal error:", error);
    const status = error.status ?? 500;
    const message = error.message ?? "Server error during withdrawal";
    return res.status(status).json({ error: message });
  }
};

export const transferService = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response> => {
  const userId = req.user?.userId;
  const { fromAccountId, toAccountId, amount, description } = req.body;

  if (!userId) {
    return res.status(401).json({ error: "User not authenticated" });
  }
  if (!amount || amount <= 0) {
    return res.status(400).json({ error: "Amount must be greater than zero" });
  }

  try {
    return await sequelize.transaction(async (t) => {
      const fromAccount = await Account.findOne({
        where: { id: fromAccountId, userId, deleted: false },
        transaction: t,
      });
      if (!fromAccount) {
        return res.status(404).json({ error: "Source account not found" });
      }
      const beforeFrom = Number(fromAccount.balance);
      
      const accountAge = Math.floor(
        (Date.now() - new Date(fromAccount.createdAt).getTime()) / (1000 * 60 * 60 * 24)
      );
      
      const frequency = await Transaction.count({
        where: {
          accountId: fromAccount.id,
          createdAt: {
            [Op.gte]: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          },
        },
      });
      
      const prediction = await runFraudDetection({
        userId,
        amount,
        accountAge,
        frequency,
      });
      if (prediction.label === "fraud" && prediction.score > 0.8) {
        await FraudLog.create({
          userId,
          accountId: fromAccount.id,
          amount,
          type: "transfer",
          reason: `AI flagged with score ${prediction.score}`,
        });
        
        return res.status(403).json({ error: "Transaction flagged as fraudulent and blocked." });}

      if (beforeFrom < amount) {
        return res.status(400).json({ error: "Insufficient funds" });
      }
      const afterFrom = beforeFrom - amount;
      await fromAccount.update({ balance: afterFrom }, { transaction: t });

      const toAccount = await Account.findOne({
        where: { id: toAccountId, deleted: false },
        transaction: t,
      });
      if (!toAccount) {
        return res
          .status(404)
          .json({ error: "Destination account not found" });
      }
      const beforeTo = Number(toAccount.balance);
      const afterTo = beforeTo + amount;
      await toAccount.update({ balance: afterTo }, { transaction: t });

      await Transaction.bulkCreate(
        [
          {
            accountId: fromAccountId,
            type: "transfer",
            amount,
            balanceBefore: beforeFrom,
            balanceAfter: afterFrom,
            description:
              description || `Transfer to ${toAccountId}`,
          },
          {
            accountId: toAccountId,
            type: "transfer",
            amount,
            balanceBefore: beforeTo,
            balanceAfter: afterTo,
            description:
              description || `Transfer from ${fromAccountId}`,
          },
        ],
        { transaction: t }
      );

      return res.status(200).json({
        success: true,
        data: { fromBalance: afterFrom, toBalance: afterTo },
      });
    });
  } catch (error: any) {
    console.error("Transfer error:", error);
    const status = error.status ?? 500;
    const message = error.message ?? "Server error during transfer";
    return res.status(status).json({ error: message });
  }
};

export const getTransactionHistoryService = async (req: AuthenticatedRequest,res: Response): Promise<Response> => {
  const userId = req.user?.userId;
  const { accountId } = req.query;

  if (!userId) {
    return res.status(401).json({ error: "User not authenticated" });
  }

  try {
    let whereClause: any = {};

    if (accountId) {
      if (typeof accountId !== "string") {
        return res.status(400).json({ error: "Invalid accountId format" });
      }

      const account = await Account.findOne({
        where: { id: accountId, userId, deleted: false },
      });

      if (!account) {
        return res.status(403).json({ error: "You do not own this account" });
      }

      whereClause.accountId = accountId;
    } else {
      const accounts = await Account.findAll({
        where: { userId, deleted: false },
        attributes: ["id"],
      });

      const userAccountIds = accounts.map((acc) => acc.id);
      whereClause.accountId = userAccountIds;
    }

    const transactions = await Transaction.findAll({
      where: whereClause,
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      data: transactions,
    });
  } catch (error) {
    console.error("Transaction history error:", error);
    return res.status(500).json({ error: "Failed to retrieve transactions" });
  }
};
