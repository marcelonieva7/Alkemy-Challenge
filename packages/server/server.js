const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => res.json({ message: 'Welcome!' }))

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${PORT}.`)
})
