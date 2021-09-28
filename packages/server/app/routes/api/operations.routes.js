const router = require('express').Router()
const {
  getAllOperations,
  saveOperation,
  getOperation,
  deleteOperation,
  updateOperation,
} = require('../../controllers/operations.controller')

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept')
  next()
})

router.route('/').get(getAllOperations).post(saveOperation)

router.route('/:operationId').get(getOperation).delete(deleteOperation).put(updateOperation)

module.exports = router
