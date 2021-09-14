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
    const logbook_id = req.params.logbookId
    const comment = req.body.comment
    let is_lecturer = false
    if(req.body.is_lecturer) is_lecturer = req.body.is_lecturer
    const data = Comment.create({ logbook_id, comment, is_lecturer })
    res.json({ success: "Successfuly inserts comment" })
    // const student_id = req.params.studentId
    // const program_id = req.params.program
    // const date = req.params.date
    // const comment = req.body.comment
    // const data = Comment.create({ student_id, program_id, date, comment })
    // res.send("Sukses")
  } catch (e) {
    res.json(errorHandling(e))
  }
}

module.exports = { index, create }