const dotenv = require('dotenv')
const express = require('express')
const cookieParser = require('cookie-parser')

// const initDB = require('./database/init')
const authRoutes = require('./routes/auth')

dotenv.config()

const app = express()

app.use(express.json())
app.use(cookieParser())

// initDB(false)

app.use(authRoutes)

app.listen(process.env.PORT, () => {
  console.log(`App listening at http://localhost:${process.env.PORT}`)
})
