const dotenv = require('dotenv')
const express = require('express')

const authRoutes = require('./route/auth')

dotenv.config()

const app = express()

app.use(express.json())

app.use(authRoutes)

app.listen(process.env.PORT, () => {
  console.log(`App listening at http://localhost:${process.env.PORT}`)
})
