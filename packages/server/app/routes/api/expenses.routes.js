const router = require('express').Router()
const {
  getAllExpenses,
  saveExpense,
  getExpense,
  deleteExpense,
  updateExpense,
} = require('../../controllers/expenses.controller')

router.route('/').get(getAllExpenses).post(saveExpense)
router.route('/:expenseId').get(getExpense).delete(deleteExpense).put(updateExpense)

module.exports = router
