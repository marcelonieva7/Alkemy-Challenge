import Joi from 'joi';

const operationSchema = Joi.object({
  type: Joi.string().valid('gasto', 'ingreso'),
  description: Joi.string().trim().min(5).max(50).required(),
  created_at: Joi.string().isoDate().trim().required(),
  amount: Joi.number().positive().precision(2).required(),
  category_id: Joi.number().integer().positive().required(),
});

export default operationSchema;
