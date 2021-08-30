const StudentProgram = require('../models/StudentProgram')
const { errorHandling } = require('../database/utils')
const Program = require('../models/Program')
const Student = require('../models/Student')

const index = async (req, res) => {
  const student_id = req.params.studentId
  const studentPrograms = await StudentProgram.findAll({ where: { student_id } })
  res.send(studentPrograms)
}

const create = async (req, res) => {
  try {
    data = req.body
    data.student_id = req.params.studentId
    const studentProgram = await StudentProgram.create(data)
    if(studentProgram){
      const program = await Program.findOne({ where: { id: data.program_id } })
      const student = await Student.findOne({ where: { id: data.student_id } })
      res.send({ success: `Successfully registered ${program.name} program into student ${student.name}` })
    }else{
      res.send("failed")
    }
  } catch (e) {
    const errorMessage = errorHandling(e)
    res.send(errorMessage)
  }
}

const show = async (req, res) => {
  try {
    const student_id = req.params.studentId
    const program_id = req.params.programId
    const studentProgram = await StudentProgram.findOne({ where: { student_id, program_id } })
    res.send(studentProgram)
  } catch (e) {
    const errorMessage = errorHandling(e)
    res.send(errorMessage)
  }
}

const update = async (req, res) => {
  try {
    const student_id = req.params.studentId
    const program_id = req.params.programId
    const studentProgram = await StudentProgram.update(req.body, { where: { student_id, program_id } })
    if(studentProgram[0] === 0) res.send({ error: `Failed to update data. Data not found or no changes submitted!` })
    else res.send({ success: "Successfully updates student program data." })
  } catch (e) {
    const errorMessage = errorHandling(e)
    res.send(errorMessage)
  }
}

module.exports = { index, create, show, update }