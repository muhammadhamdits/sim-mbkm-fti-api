const { errorHandling } = require('../database/utils')
const StudentProgramCourse = require('../models/StudentProgramCourse')

const index = async (req, res) => {
  const student_id = req.params.studentId
  const program_id = req.params.programId
  const studentProgramCourses = await StudentProgramCourse.findAll({ where: { student_id, program_id } })
  res.send(studentProgramCourses)
}

const create = async (req, res) => {
  try {
    const student_id = req.params.studentId
    const program_id = req.params.programId
    if(req.body.course_id){
      let data = []
      req.body.course_id.forEach(course_id => {
        data.push({
          student_id,
          program_id,
          course_id
        })
      })
      const studentProgramCourse = await StudentProgramCourse.bulkCreate(data)
      res.send("Sukses")
    }else res.send("Gagal")
  } catch (e) {
    res.send(errorHandling(e))
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
  if(studentProgramCourse === 0) res.send("Gagal")
  else res.send("Sukses")
}

module.exports = { index, create, update, destroy }