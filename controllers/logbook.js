const { errorHandling } = require("../database/utils")
const Logbook = require("../models/Logbook")

const index = (req, res) => {
  const student_id = req.params.studentId
  const program_id = req.params.programId
  const logbooks = Logbook.findAll({ where: { student_id, program_id } })
  res.send(logbooks)
}

const create = (req, res) => {
  try {
    const student_id = req.params.studentId
    const program_id = req.params.programId
    const log = req.body.log
    const logbook = Logbook.create({ student_id, program_id, log })
    res.send("Sukses")
  } catch (e) {
    res.send(errorHandling(e))
  }
}

module.exports = { index, create }