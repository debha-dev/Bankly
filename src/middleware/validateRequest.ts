import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export const validateRequest =
  (schema: Joi.ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json({
        error: "Validation error",
        details: error.details.map((d) => d.message),
      });
    } else {
      next();
    }
  };