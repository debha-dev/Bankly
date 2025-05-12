import Joi from "joi";

export const signupSchema = Joi.object({
  fullName: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().pattern(/^0[789][01]\d{8}$/).required(),
  password: Joi.string().min(6).required(),
}).unknown(true);

export const loginSchema = Joi.object({
  phoneNumber: Joi.string().required(),
  password: Joi.string().required(),
});
