const { errorHandling } = require("../database/utils")
const Logbook = require("../models/Logbook")
const formidable = require("formidable")
const mv = require('mv')

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
    let form = new formidable.IncomingForm()
    
    form.parse(req, async (err, fields, files) => {
      let log = fields.log
      let file = ''
      if(files.file) file = files.file.name
      const logbook = await Logbook.create({ student_id, program_id, log, file })
      
      if(files.file){
        let oldPath = files.file.path
        let newName = `${logbook.id}-${files.file.name}`
        let newPath = `${__dirname}/../public/logbook/${newName}`
        
        mv(oldPath, newPath, (err) => {
          if(err) throw err
        })
      }

      res.json({ success: "Succesfully adds log activity" })
    })
  } catch (e) {
    // console.log(e)
    res.json(errorHandling(e))
  }
}

const download = async (req, res) => {
  let id = req.params.logId
  let logbook = await Logbook.findOne({ where: { id } })
  if(logbook){
    let dirPath = `${__dirname}/../public/logbook/`
    let fileName = `${logbook.id}-${logbook.file}`
    res.download(dirPath + fileName, fileName, (err) => {
      if (err) {
        res.status(500).send({
          message: "Could not download the file. " + err,
        })
      }
    })
  }
}

module.exports = { index, create, download }