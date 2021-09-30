const Joi = require('joi')

const operationSchema = Joi.object({
  description: Joi.string().trim().min(5).max(50).required(),
  typeOf: Joi.string().trim().valid('income', 'expense').required(),
  created_at: Joi.string().isoDate().trim().required(),
  amount: Joi.number().positive().precision(2).required(),
})

module.exports = operationSchema
