const Agency = require('../models/Agency')
const { errorHandling } = require('../database/utils')

const index = async (req, res) => {
  const agencies = await Agency.findAll()
  res.send(agencies)
}

const create = async (req, res) => {
  try {
    const agency = await Agency.create(req.body)
    res.send({ success: `Successfully creates ${agency.name} agency.` })
  } catch (e) {
    const errorMessage = errorHandling(e)
    res.send(errorMessage)
  }
}

const update = async (req, res) => {
  try {
    const id = req.params.agencyId
    const agency = await Agency.update(req.body, { where: { id } })
    if(agency[0] === 0) res.send({ error: `Failed to update data. Data not found or no changes submitted!` })
    else res.send({ success: "Successfully updates agency data." })
  } catch (e) {
    const errorMessage = errorHandling(e)
    res.send(errorMessage)
  }
}

const destroy = async (req, res) => {
  const id = req.params.agencyId
  const agency = await Agency.destroy({ where: { id } })
  if(agency === 0) res.send({ error: `Agency data with id ${id} not found!` })
  else res.send({ success: "Successfully deletes agency data." })
}

module.exports = { index, create, update, destroy }