const ProgramType = require('../models/ProgramType')
const { errorHandling } = require('../database/utils')

const index = async (req, res) => {
  const types = await ProgramType.findAll()
  res.json(types)
}

const create = async (req, res) => {
  try {
    const type = await ProgramType.create(req.body)
    res.json({ success: `Successfully creates ${type.name} program type.` })
  } catch (e) {
    const errorMessage = errorHandling(e)
    res.json(errorMessage)
  }
}

const update = async (req, res) => {
  try {
    const id = req.params.typeId
    const type = await ProgramType.update(req.body, { where: { id } })
    if(type[0] === 0) res.json({ error: `Failed to update data. Data not found or no changes submitted!` })
    else res.json({ success: "Successfully updates program type data." })
  } catch (e) {
    const errorMessage = errorHandling(e)
    res.json(errorMessage)
  }
}

const destroy = async (req, res) => {
  const id = req.params.typeId
  const type = await ProgramType.destroy({ where: { id } })
  if(type === 0) res.json({ error: `Program type data with id ${id} not found!` })
  else res.json({ success: "Successfully deletes program type data." })
}

module.exports = { index, create, update, destroy }