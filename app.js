const dotenv = require('dotenv')
const express = require('express')
const cookieParser = require('cookie-parser')

const initDB = require('./database/init')
const authRoutes = require('./routes/auth')
const typeRoutes = require('./routes/type')
const agencyRoutes = require('./routes/agency')
const courseRoutes = require('./routes/course')

dotenv.config()

const app = express()

app.use(express.json())
app.use(cookieParser())

initDB(false)

app.use(authRoutes)
app.use(typeRoutes)
app.use(agencyRoutes)
app.use(courseRoutes)

app.listen(process.env.PORT, () => {
  console.log(`App listening at http://localhost:${process.env.PORT}`)
})
