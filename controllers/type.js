const ProgramType = require('../models/ProgramType')

const errorHandling = (error) => {
  if(error.errors[0].type === 'notNull Violation' || error.errors[0].validatorKey === 'notEmpty'){
    return { error: `Please enter '${error.errors[0].path}' field!` }
  }else if(error.errors[0].type === 'unique violation'){
    return { error: `Name '${error.errors[0].value}' is already registered! Please input another name` }
  }else{
    return { error: `Error` }
  }
}

const index = async (req, res) => {
  const types = await ProgramType.findAll()
  res.send(types)
}

const create = async (req, res) => {
  try {
    const type = await ProgramType.create(req.body)
    res.send({ success: `Successfully creates ${type.name} program type.` })
  } catch (error) {
    const errorMessage = errorHandling(error)
    res.send(errorMessage)
  }
}

const update = async (req, res) => {
  try {
    const id = req.params.typeId
    const type = await ProgramType.update(req.body, { where: { id } })
    if(type[0] === 0) res.send({ error: "Not found or data invalid!" })
    else res.send({ success: "Successfully updates program type data." })
  } catch (error) {
    const errorMessage = errorHandling(error)
    res.send(errorMessage)
  }
}

const destroy = async (req, res) => {
  const id = req.params.typeId
  const type = await ProgramType.destroy({ where: { id } })
  if(type === 0) res.send({ error: "Not found!" })
  else res.send({ success: "Successfully deletes program type data" })
}

module.exports = { index, create, update, destroy }