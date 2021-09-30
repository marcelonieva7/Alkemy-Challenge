const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const apiRouter = require('./app/routes/api.routes')

const app = express()

app.use(cors())
app.use(express.json())

// routes
app.use('/api', apiRouter)
app.get('/', (req, res) => res.json({ message: 'Welcome!' }))

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${PORT}.`)
})
