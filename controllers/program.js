const Program = require('../models/Program')
const { errorHandling } = require('../database/utils')

const index = async (req, res) => {
  const program = await Program.findAll()
  res.send(program)
}

const create = async (req, res) => {
  try {
    const program = await Program.create(req.body)
    res.send({ success: `Successfully creates ${program.name} program.` })
  } catch (e) {
    const errorMessage = errorHandling(e)
    res.send(errorMessage)
  }
}

const show = async (req, res) => {
  try {
    const id = req.params.programId
    const program = await Program.findOne({ where: { id } })
    res.send(program)
  } catch (e) {
    const errorMessage = errorHandling(e)
    res.send(errorMessage)
  }
}

const update = async (req, res) => {
  try {
    const id = req.params.programId
    const program = await Program.update(req.body, { where: { id } })
    if(program[0] === 0) res.send({ error: `Failed to update data. Data not found or no changes submitted!` })
    else res.send({ success: "Successfully updates program data." })
  } catch (e) {
    const errorMessage = errorHandling(e)
    res.send(errorMessage)
  }
}

const destroy = async (req, res) => {
  const id = req.params.programId
  const program = await Program.destroy({ where: { id } })
  if(program === 0) res.send({ error: `Program data with id ${id} not found!` })
  else res.send({ success: "Successfully deletes program data." })
}

module.exports = { index, show, create, update, destroy }