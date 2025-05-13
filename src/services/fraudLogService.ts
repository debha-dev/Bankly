import { Request, Response } from "express";
import { FraudLog } from "../models/fraudLogModel";
import { AuthenticatedRequest } from "../middleware/authMiddleware";

export const getFraudLogsService = async (req: AuthenticatedRequest,res: Response): Promise<Response> => {
  try {
    const userId = req.user?.userId;

    const logs = await FraudLog.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({success: true,data: logs,});
  } catch (error) {
    console.error("Get fraud logs error:", error);
    return res.status(500).json({ error: "Failed to retrieve fraud logs" });
  }
};
