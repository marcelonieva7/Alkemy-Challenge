const router = require('express').Router()
const operationsRouter = require('./api/operations.routes')
const incomesRouter = require('./api/incomes.routes')
const expensesRouter = require('./api/expenses.routes')

router.use('/expenses', expensesRouter)
router.use('/operations', operationsRouter)
router.use('/incomes', incomesRouter)

module.exports = router
