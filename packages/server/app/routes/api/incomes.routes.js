const router = require('express').Router()
const {
  getAllIncomes,
  saveIncome,
  getIncome,
  deleteIncome,
  updateIncome,
} = require('../../controllers/incomes.controller')

router.route('/').get(getAllIncomes).post(saveIncome)
router.route('/:incomeId').get(getIncome).delete(deleteIncome).put(updateIncome)

module.exports = router
