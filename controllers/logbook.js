const { errorHandling } = require("../database/utils")
const Logbook = require("../models/Logbook")

const index = (req, res) => {
  const student_id = req.params.studentId
  const program_id = req.params.programId
  const logbooks = Logbook.findAll({ where: { student_id, program_id } })
  res.send(logbooks)
}

const create = async (req, res) => {
  try {
    const student_id = req.params.studentId
    const program_id = req.params.programId
    const log = req.body.log
    const logbook = await Logbook.create({ student_id, program_id, log })
    res.json({ success: "Succesfully adds log activity" })
  } catch (e) {
    // console.log(e)
    res.json(errorHandling(e))
  }
}

module.exports = { index, create }