import { Router } from "express";
import {createAccountController,getUserAccountsController,getAccountByIdController,updateAccountDetailsController,closeAccountController, setAccountPinController,} from "../controllers/accountController";
import { authenticateUser } from "../middleware/authMiddleware";

export const accountRouter = Router();

accountRouter.post("/create",authenticateUser,createAccountController);
accountRouter.get("/",authenticateUser,getUserAccountsController);
accountRouter.get("/:accountId",authenticateUser,getAccountByIdController);
accountRouter.put("/update",authenticateUser,updateAccountDetailsController);
accountRouter.delete("/close",authenticateUser,closeAccountController);
accountRouter.put("/:accountId/pin",authenticateUser,setAccountPinController);

/**
 * @swagger
 * tags:
 *   name: Accounts
 *   description: Bank account management
 */

/**
 * @swagger
 * /api/accounts/create:
 *   post:
 *     summary: Create a new bank account for the authenticated user
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accountType:
 *                 type: string
 *                 enum: [savings, current]
 *               currency:
 *                 type: string
 *                 example: NGN
 *     responses:
 *       201:
 *         description: Account created successfully
 *       401:
 *         description: Unauthorized, user not authenticated
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/accounts:
 *   get:
 *     summary: Get all bank accounts for the authenticated user
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's accounts
 *       401:
 *         description: Unauthorized, user not authenticated
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/accounts/:accountId:
 *   get:
 *     summary: Get a specific bank account by ID
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: accountId
 *         schema:
 *           type: string
 *         required: true
 *         description: UUID of the account
 *     responses:
 *       200:
 *         description: Account details retrieved successfully
 *       401:
 *         description: Unauthorized, user not authenticated
 *       404:
 *         description: Account not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/accounts/update:
 *   put:
 *     summary: Update details of a bank account (e.g., PIN)
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accountId:
 *                 type: string
 *                 description: UUID of the account
 *               pin:
 *                 type: string
 *                 example: "1234"
 *     responses:
 *       200:
 *         description: Account updated successfully
 *       400:
 *         description: Bad request, no valid fields provided
 *       401:
 *         description: Unauthorized, user not authenticated
 *       404:
 *         description: Account not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/accounts/close:
 *   delete:
 *     summary: Close (soft delete) a bank account
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accountId:
 *                 type: string
 *                 description: UUID of the account to close
 *     responses:
 *       200:
 *         description: Account closed successfully
 *       401:
 *         description: Unauthorized, user not authenticated
 *       404:
 *         description: Account not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/accounts/{accountId}/pin:
 *   put:
 *     summary: Set or update a 4-digit transaction PIN for a specific account
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: accountId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the account to set the PIN for
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pin:
 *                 type: string
 *                 example: "1234"
 *             required:
 *               - pin
 *     responses:
 *       200:
 *         description: PIN set successfully
 *       400:
 *         description: Invalid PIN or missing input
 *       401:
 *         description: Unauthorized, user not logged in
 *       404:
 *         description: Account not found
 */

