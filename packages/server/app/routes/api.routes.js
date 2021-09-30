const router = require('express').Router()
const operationsRouter = require('./api/operations.routes')

router.get('/', (req, res) => {
  res.redirect('https://documenter.getpostman.com/view/15969040/Tzz7Md4M')
})
router.use('/operations', operationsRouter)

module.exports = router
