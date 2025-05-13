import {Router} from "express";
import { depositController, withdrawalController, transferController, getTransactionHistoryController } from "../controllers/transactionController";
import { authenticateUser } from "../middleware/authMiddleware";

export const transactionRouter = Router();

transactionRouter.post("/deposit/:accountId", authenticateUser, depositController);
transactionRouter.post("/withdraw/:accountId", authenticateUser, withdrawalController);
transactionRouter.post("/transfer", authenticateUser, transferController);
transactionRouter.get("/", authenticateUser, getTransactionHistoryController);
/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: Banking transaction operations
 */

/**
 * @swagger
 * /transactions/deposit/{accountId}:
 *   post:
 *     summary: Deposit money into an account
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: accountId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the account to deposit into
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *             properties:
 *               amount:
 *                 type: number
 *               description:
 *                 type: string
 *                 example: Salary deposit
 *     responses:
 *       200:
 *         description: Deposit successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     balance:
 *                       type: number
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Account not found
 */

/**
 * @swagger
 * /transactions/withdraw/{accountId}:
 *   post:
 *     summary: Withdraw money from an account
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: accountId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the account to withdraw from
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *             properties:
 *               amount:
 *                 type: number
 *               description:
 *                 type: string
 *                 example: Bill payment
 *     responses:
 *       200:
 *         description: Withdrawal successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     balance:
 *                       type: number
 *       400:
 *         description: Insufficient funds or invalid amount
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Account not found
 */

/**
 * @swagger
 * /transactions/transfer:
 *   post:
 *     summary: Transfer money between accounts
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fromAccountId
 *               - toAccountId
 *               - amount
 *             properties:
 *               fromAccountId:
 *                 type: string
 *               toAccountId:
 *                 type: string
 *               amount:
 *                 type: number
 *               description:
 *                 type: string
 *                 example: Rent payment
 *     responses:
 *       200:
 *         description: Transfer successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     fromBalance:
 *                       type: number
 *                     toBalance:
 *                       type: number
 *       400:
 *         description: Invalid transfer request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: One or both accounts not found
 */
/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Get transaction history
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: accountId
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *         description: Optional account ID to filter transactions
 *     responses:
 *       200:
 *         description: List of transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       type:
 *                         type: string
 *                       amount:
 *                         type: number
 *                       description:
 *                         type: string
 *                       balanceBefore:
 *                         type: number
 *                       balanceAfter:
 *                         type: number
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *       401:
 *         description: Unauthorized
 */
