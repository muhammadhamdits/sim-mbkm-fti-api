const StudentProgram = require('../models/StudentProgram')
const { errorHandling } = require('../database/utils')
const Program = require('../models/Program')
const Student = require('../models/Student')

const getStudentPrograms = async (opt = {}) => {
  const studentPrograms = await StudentProgram.findAll(opt)
  var tempDatas = []
  await Promise.all(studentPrograms.map(async studentProgram => {
    await studentProgram.init()
    await studentProgram.program.init()

    let tempData = studentProgram.dataValues
    var tempCourses = []
    var tempSPCs = []

    studentProgram.courses.forEach(course => {
      let tempSPC = course.dataValues
      tempSPC.course = course.course.dataValues
      tempSPCs.push(tempSPC)
    })
    
    tempData.courses = tempSPCs
    tempData.program = studentProgram.program.dataValues
    tempData.program.program_type = studentProgram.program.program_type.dataValues
    tempData.program.agency = studentProgram.program.agency.dataValues

    studentProgram.program.courses.forEach(course => {
      tempCourses.push(course.dataValues)
    })
    tempData.program.courses = tempCourses

    tempData.student = studentProgram.student.dataValues
    if(studentProgram.supervisor) tempData.supervisor = studentProgram.supervisor.name
    else tempData.supervisor = "-"

    if(tempData.status === 0) tempData.status_name = 'Proposed'
    else if(tempData.status === 1) tempData.status_name = 'Accepted'
    else if(tempData.status === 2) tempData.status_name = 'Rejected'
    else if(tempData.status === 3) tempData.status_name = 'Active'
    else if(tempData.status === 4) tempData.status_name = 'Ended'

    tempDatas.push(tempData)
  }))
  return tempDatas
}

const getAll = async (req, res) => {
  let studentProgramDatas = await getStudentPrograms()
  res.json(studentProgramDatas)
}

const getBySupervisor = async (req, res) => {
  const lecturer_id = req.params.supervisorId
  let studentProgramDatas = await getStudentPrograms({ where: { lecturer_id } })
  res.json(studentProgramDatas)
}

const index = async (req, res) => {
  const student_id = req.params.studentId
  let studentProgramDatas = await getStudentPrograms({ where: { student_id } })
  res.json(studentProgramDatas)
}

const create = async (req, res) => {
  try {
    data = req.body
    data.student_id = req.params.studentId
    const studentProgram = await StudentProgram.create(data)
    if(studentProgram){
      const program = await Program.findOne({ where: { id: data.program_id } })
      const student = await Student.findOne({ where: { id: data.student_id } })
      res.json({ success: `Successfully registered ${program.name} program into student ${student.name}` })
    }else{
      res.json({ failed: "Failed" })
    }
  } catch (e) {
    // console.log(e)
    const errorMessage = errorHandling(e)
    res.json(errorMessage)
  }
}

const show = async (req, res) => {
  try {
    const student_id = req.params.studentId
    const program_id = req.params.programId
    const studentProgram = await StudentProgram.findOne({ where: { student_id, program_id } })
    res.send(studentProgram)
  } catch (e) {
    const errorMessage = errorHandling(e)
    res.send(errorMessage)
  }
}

const update = async (req, res) => {
  try {
    const student_id = req.params.studentId
    const program_id = req.params.programId
    const studentProgram = await StudentProgram.update(req.body, { where: { student_id, program_id } })
    if(studentProgram[0] === 0) res.send({ error: `Failed to update data. Data not found or no changes submitted!` })
    else res.send({ success: "Successfully updates student program data." })
  } catch (e) {
    const errorMessage = errorHandling(e)
    res.send(errorMessage)
  }
}

module.exports = { getAll, getBySupervisor, index, create, show, update }