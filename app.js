const dotenv = require('dotenv')
const express = require('express')
const cookieParser = require('cookie-parser')

// const initDB = require('./database/init')
const authRoutes = require('./routes/auth')
const typeRoutes = require('./routes/type')

dotenv.config()

const app = express()

app.use(express.json())
app.use(cookieParser())

// initDB(true)

app.use(authRoutes)
app.use(typeRoutes)

app.listen(process.env.PORT, () => {
  console.log(`App listening at http://localhost:${process.env.PORT}`)
})
