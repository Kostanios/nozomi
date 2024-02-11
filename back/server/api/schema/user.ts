import Joi from 'joi';

export const userSchema = Joi.object({
  username: Joi.string().min(6).required(),
  password: Joi.string().min(6).required(),
});
