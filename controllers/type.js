const ProgramType = require('../models/ProgramType')
const { errorHandling } = require('../database/utils')

const index = async (req, res) => {
  const types = await ProgramType.findAll()
  res.send(types)
}

const create = async (req, res) => {
  try {
    const type = await ProgramType.create(req.body)
    res.send({ success: `Successfully creates ${type.name} program type.` })
  } catch (e) {
    const errorMessage = errorHandling(e)
    res.send(errorMessage)
  }
}

const update = async (req, res) => {
  try {
    const id = req.params.typeId
    const type = await ProgramType.update(req.body, { where: { id } })
    if(type[0] === 0) res.send({ error: `Failed to update data. Data not found or no changes submitted!` })
    else res.send({ success: "Successfully updates program type data." })
  } catch (e) {
    const errorMessage = errorHandling(e)
    res.send(errorMessage)
  }
}

const destroy = async (req, res) => {
  const id = req.params.typeId
  const type = await ProgramType.destroy({ where: { id } })
  if(type === 0) res.send({ error: `Program type data with id ${id} not found!` })
  else res.send({ success: "Successfully deletes program type data." })
}

module.exports = { index, create, update, destroy }