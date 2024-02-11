import Joi from 'joi';

export const medicationSchema = Joi.object({
  name: Joi.string().min(4).required(),
  description: Joi.string(),
  count: Joi.number().required(),
  destination_count: Joi.number(),
});
