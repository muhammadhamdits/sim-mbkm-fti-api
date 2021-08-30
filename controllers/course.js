const Course = require('../models/Course')
const { errorHandling } = require('../database/utils')

const index = async (req, res) => {
  const courses = await Course.findAll()
  res.send(courses)
}

const create = async (req, res) => {
  try {
    const course = await Course.create(req.body)
    res.send({ success: `Successfully creates ${course.name} course.` })
  } catch (e) {
    const errorMessage = errorHandling(e)
    res.send(errorMessage)
  }
}

const update = async (req, res) => {
  try {
    const id = req.params.courseId
    const course = await Course.update(req.body, { where: { id } })
    if(course[0] === 0) res.send({ error: `Failed to update data. Data not found or no changes submitted!` })
    else res.send({ success: "Successfully updates course data." })
  } catch (e) {
    const errorMessage = errorHandling(e)
    res.send(errorMessage)
  }
}

const destroy = async (req, res) => {
  const id = req.params.courseId
  const course = await Course.destroy({ where: { id } })
  if(course === 0) res.send({ error: `Course data with id ${id} not found!` })
  else res.send({ success: "Successfully deletes course data." })
}

module.exports = { index, create, update, destroy }