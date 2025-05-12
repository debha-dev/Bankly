import { Router } from "express";
import {signupUserController, loginUserController, deleteAccountController, updateAccountController, userDetailsController} from "../controllers/userController";
import { authenticateUser } from "../middleware/authMiddleware";
import { validateRequest } from "../middleware/validateRequest";
import { signupSchema, loginSchema } from "../utils/validators";

export const userRouter = Router();

userRouter.post("/signup", validateRequest(signupSchema), signupUserController);
userRouter.post("/login", validateRequest(loginSchema), loginUserController);
userRouter.get("/me", authenticateUser, userDetailsController);
userRouter.put("/update", authenticateUser, updateAccountController);
userRouter.delete("/delete", authenticateUser, deleteAccountController);


/**
 * @swagger
 * /api/users/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request, invalid data
 *       409:
 *         description: User already exists
 */

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Log in an existing user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Bad request, invalid data
 *       401:
 *         description: Invalid credentials
 */

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Get the current user's profile details
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fullName:
 *                   type: string
 *                 email:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       401:
 *         description: Unauthorized, user not logged in
 */

/**
 * @swagger
 * /api/users/update:
 *   put:
 *     summary: Update the current user's profile details
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *       400:
 *         description: Bad request, invalid data
 *       401:
 *         description: Unauthorized, user not logged in
 */

/**
 * @swagger
 * /api/users/delete:
 *   delete:
 *     summary: Delete the current user's account
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User account deleted successfully
 *       401:
 *         description: Unauthorized, user not logged in
 *       403:
 *         description: Forbidden, cannot delete account
 */

