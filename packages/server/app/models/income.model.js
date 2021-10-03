const Joi = require('joi')

const incomeSchema = Joi.object({
  description: Joi.string().trim().min(5).max(50).required(),
  created_at: Joi.string().isoDate().trim().required(),
  amount: Joi.number().positive().precision(2).required(),
})

module.exports = incomeSchema
