const Course = require('../models/Course')
const { errorHandling } = require('../database/utils')

const index = async (req, res) => {
  const courses = await Course.findAll()
  res.json(courses)
}

const create = async (req, res) => {
  try {
    const course = await Course.create(req.body)
    res.json({ success: `Successfully creates ${course.name} course.` })
  } catch (e) {
    const errorMessage = errorHandling(e)
    res.json(errorMessage)
  }
}

const update = async (req, res) => {
  try {
    const id = req.params.courseId
    const course = await Course.update(req.body, { where: { id } })
    if(course[0] === 0) res.json({ error: `Failed to update data. Data not found or no changes submitted!` })
    else res.json({ success: "Successfully updates course data." })
  } catch (e) {
    const errorMessage = errorHandling(e)
    res.json(errorMessage)
  }
}

const destroy = async (req, res) => {
  const id = req.params.courseId
  const course = await Course.destroy({ where: { id } })
  if(course === 0) res.json({ error: `Course data with id ${id} not found!` })
  else res.json({ success: "Successfully deletes course data." })
}

module.exports = { index, create, update, destroy }