const { errorHandling } = require("../database/utils")
const Comment = require("../models/Comment")

const index = (req, res) => {
  const student_id = req.params.studentId
  const program_id = req.params.programId
  const date = req.params.date
  const comments = Comment.findAll({ where: { student_id, program_id, date } })
  res.send(comments)
}

const create = (req, res) => {
  try {
    const student_id = req.params.studentId
    const program_id = req.params.program
    const date = req.params.date
    const comment = req.body.comment
    const data = Comment.create({ student_id, program_id, date, comment })
    res.send("Sukses")
  } catch (e) {
    res.send(errorHandling(e))
  }
}

module.exports = { index, create }