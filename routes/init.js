const authRoutes = require('./auth')
const typeRoutes = require('./type')
const agencyRoutes = require('./agency')
const courseRoutes = require('./course')
const programRoutes = require('./program')
const programCourseRoutes = require('./programcourse')
const studentProgramRoutes = require('./studentprogram')

const initRoutes = (app) => {
  app.use(authRoutes)
  app.use(typeRoutes)
  app.use(agencyRoutes)
  app.use(courseRoutes)
  app.use(programRoutes)
  app.use(programCourseRoutes)
  app.use(studentProgramRoutes)
}

module.exports = initRoutes