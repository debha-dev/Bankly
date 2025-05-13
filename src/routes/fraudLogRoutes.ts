import {Router} from "express";
import { getFraudLogsService } from "../services/fraudLogService";
import { authenticateUser, AuthenticatedRequest } from "../middleware/authMiddleware";

export const fraudRouter = Router();

fraudRouter.get("/", authenticateUser, async (req, res) => {
  await getFraudLogsService(req as AuthenticatedRequest, res);
});

/**
 * @swagger
 * tags:
 *   name: Fraud Logs
 *   description: AI-powered fraud detection history
 */

/**
 * @swagger
 * /fraud-logs:
 *   get:
 *     summary: Get fraud detection logs for the authenticated user
 *     tags: [Fraud Logs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of fraud logs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                         example: "e8dbf69d-11cf-4c44-bb17-9e91d172ef34"
 *                       userId:
 *                         type: string
 *                         format: uuid
 *                         example: "b4a3f350-1f77-4b9d-9872-3153d19b0423"
 *                       amount:
 *                         type: number
 *                         example: 1200
 *                       accountAge:
 *                         type: number
 *                         example: 3
 *                       frequency:
 *                         type: number
 *                         example: 2
 *                       prediction:
 *                         type: string
 *                         example: "fraud"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-05-13T10:23:12.000Z"
 *       401:
 *         description: Unauthorized – missing or invalid token
 *       500:
 *         description: Server error while fetching fraud logs
 */
