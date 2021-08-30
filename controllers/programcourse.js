const ProgramCourse = require('../models/ProgramCourse')
const { errorHandling } = require('../database/utils')
const Program = require('../models/Program')
const Course = require('../models/Course')

const index = async (req, res) => {
  const program_id = req.params.programId
  const programCourse = await ProgramCourse.findAll({ where: { program_id } })
  res.send(programCourse)
}

const create = async (req, res) => {
  try {
    const program_id = req.params.programId
    const course_id = req.body.course_id
    const programCourse = await ProgramCourse.create({ program_id, course_id })
    if(programCourse){
      const program = await Program.findOne({ where: { id: program_id } })
      const course = await Course.findOne({ where: { id: course_id } })
      res.send({ success: `Successfully adds ${course.name} into ${program.name} program.` })
    }else{
      res.send("failed")
    }
  } catch (e) {
    const errorMessage = errorHandling(e)
    res.send(errorMessage)
  }
}

const destroy = async (req, res) => {
  const program_id = req.params.programId
  const course_id = req.params.courseId
  const programCourse = await ProgramCourse.destroy({ where: { program_id, course_id } })
  if(programCourse === 0) res.send({ error: `No course with id ${course_id} in program with id ${program_id}` })
  else {
    const program = await Program.findOne({ where: { id: program_id }})
    const course = await Course.findOne({ where: { id: course_id }})
    res.send({ success: `Successfully deletes course ${course.name} from program ${program.name}.` })
  }
}

module.exports = { index, create, destroy }