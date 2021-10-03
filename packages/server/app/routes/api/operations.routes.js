const router = require('express').Router()
const { getAllOperations } = require('../../controllers/operations.controller')

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept')
  next()
})

router.route('/').get(getAllOperations)

module.exports = router
