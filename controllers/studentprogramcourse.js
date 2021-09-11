const { errorHandling } = require('../database/utils')
const StudentProgramCourse = require('../models/StudentProgramCourse')

const index = async (req, res) => {
  const student_id = req.params.studentId
  const program_id = req.params.programId
  const studentProgramCourses = await StudentProgramCourse.findAll({ where: { student_id, program_id } })
  res.json(studentProgramCourses)
}

const create = async (req, res) => {
  try {
    const student_id = req.params.studentId
    const program_id = req.params.programId

    let tempData = []
    req.body.forEach(course_id => {
      tempData.push({
        student_id,
        program_id,
        course_id
      })
    })
    const studentProgramCourse = await StudentProgramCourse.bulkCreate(tempData)
    res.json({ success: 'Succesfully adds courses into this program' })
  } catch (e) {
    res.json(errorHandling(e))
  }
}

const update = async (req, res) => {
  try {
    const student_id = req.params.studentId
    const program_id = req.params.programId
    const course_id = req.params.courseId
    const studentProgramCourse = await StudentProgramCourse.findOne({ where: { student_id, program_id, course_id } })
    if(studentProgramCourse[0] === 0) res.send("Gagal")
    else res.send({ success: "Sukses" })
  } catch (e) {
    res.send(errorHandling(e))
  }
}

const destroy = async (req, res) => {
  const student_id = req.params.studentId
  const program_id = req.params.programId
  const course_id = req.params.courseId
  const studentProgramCourse = await StudentProgramCourse.destroy({ where: { student_id, program_id, course_id } })
  if(studentProgramCourse === 0) res.json({ error: 'Failed remove course' })
  else res.json({ success: 'Succesfully remove course' })
}

module.exports = { index, create, update, destroy }