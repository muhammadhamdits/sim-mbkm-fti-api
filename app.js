const dotenv = require('dotenv')
const express = require('express')
const cookieParser = require('cookie-parser')

const initDB = require('./database/init')
const initRoutes = require('./routes/init')

dotenv.config()

const app = express()

app.use(express.json())
app.use(cookieParser())

// initDB(false)
initRoutes(app)

app.listen(process.env.PORT, () => {
  console.log(`App listening at http://localhost:${process.env.PORT}`)
})
