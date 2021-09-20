const Program = require('../models/Program')
const { errorHandling } = require('../database/utils')
const ProgramCourse = require('../models/ProgramCourse')
const moment = require('moment')

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

    let todayDate = moment()
    let openDate = moment(tempDataObject.open_date, "YYYY-MM-DD")
    let closeDate = moment(tempDataObject.close_date, "YYYY-MM-DD")

    tempDataObject.registStatus = todayDate.isBetween(openDate, closeDate)

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
    // console.log(req.body.courses)
    const id = req.params.programId
    const courses = req.body.courses
    const program = await Program.update(req.body, { where: { id } })
    // await ProgramCourse.destroy({ where: { program_id: id } })
    const programCourses = await ProgramCourse.findAll({ where: { program_id: id } })
    let pCs = programCourses.filter(pC => !courses.find(c => c === pC.course_id ))
    // console.log(pCs)
    await Promise.all(pCs.map(async (pC) => {
      let program_id = id
      let course_id = pC.course_id.toString()
      await ProgramCourse.update({ is_deleted: true }, { where: { program_id, course_id } })
    }))
    // console.log('b')
    let cs = courses.filter(c => !programCourses.find(pC => c === pC.course_id && !pC.is_deleted))
    await Promise.all(cs.map(async c => {
      if(await ProgramCourse.findOne({ where: { program_id: id, course_id: c } })){
        // console.log('a')
        await ProgramCourse.update({ is_deleted: false }, { where: { program_id: id, course_id: c } })
      }else{
        // console.log('b')
        await ProgramCourse.create({ program_id: id, course_id: c })
      }
    }))
    // console.log('c')
    // res.json(programCourses)
    // console.log(courses)
    // datas = []
    // courses.forEach(course_id => {
    //   datas.push({
    //     program_id: id,
    //     course_id
    //   })
    // })
    // if(datas.length) await ProgramCourse.bulkCreate(datas)
    // res.json("sss")
    res.json({ success: "Successfully updates program data." })
  } catch (e) {
    // console.log(e)
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