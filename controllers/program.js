const Program = require('../models/Program')
const { errorHandling } = require('../database/utils')
const ProgramCourse = require('../models/ProgramCourse')

const index = async (req, res) => {
  const programs = await Program.findAll()
  var allPrograms = []
  var tempCourses = []
  await Promise.all(programs.map(async (program) => {
    await program.type()
    await program.getAgency()
    await program.getCourses()
    
    let tempDataObject = program.dataValues
    tempCourses = []

    await Promise.all(program.courses.map(async (course) => {
      tempCourses.push(course.dataValues)
    }))
    tempDataObject.program_type = program.program_type.dataValues
    tempDataObject.agency = program.agency.dataValues
    tempDataObject.courses = tempCourses

    allPrograms.push(tempDataObject)
  }))
  res.json(allPrograms)
}

const create = async (req, res) => {
  try {
    const program = await Program.create(req.body)
    const courses = req.body.courses
    datas = []
    courses.forEach(course_id => {
      datas.push({
        program_id: program.id,
        course_id
      })
    })
    if(datas.length) await ProgramCourse.bulkCreate(datas)
    res.json({ success: `Successfully creates ${program.name} program.` })
  } catch (e) {
    const errorMessage = errorHandling(e)
    res.json(errorMessage)
  }
}

const show = async (req, res) => {
  try {
    const id = req.params.programId
    const program = await Program.findOne({ where: { id } })
    res.json(program)
  } catch (e) {
    const errorMessage = errorHandling(e)
    res.json(errorMessage)
  }
}

const update = async (req, res) => {
  try {
    const id = req.params.programId
    const program = await Program.update(req.body, { where: { id } })
    await ProgramCourse.destroy({ where: { program_id: id } })
    const courses = req.body.courses
    datas = []
    courses.forEach(course_id => {
      datas.push({
        program_id: id,
        course_id
      })
    })
    if(datas.length) await ProgramCourse.bulkCreate(datas)
    res.json({ success: "Successfully updates program data." })
  } catch (e) {
    const errorMessage = errorHandling(e)
    res.json(errorMessage)
  }
}

const destroy = async (req, res) => {
  const id = req.params.programId
  const program = await Program.destroy({ where: { id } })
  if(program === 0) res.json({ error: `Program data with id ${id} not found!` })
  else res.json({ success: "Successfully deletes program data." })
}

module.exports = { index, show, create, update, destroy }