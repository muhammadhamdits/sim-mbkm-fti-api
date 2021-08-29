const fs = require('fs')
const { conn } = require('./database/db')

migrations = [
  "admins", 
  "students", 
  "lecturers", 
  "program_types", 
  "agencies",
  "courses",
  "programs",
  "program_courses",
  "student_programs",
  "student_program_courses",
  "logbooks",
  "comments"
]

const getSqlString = (data) => {
  let sqlString = `CREATE TABLE ${data.table} (`

  data.fields.forEach(field => {
    sqlString += ` ${field.name} ${field.type}`
    field.options.forEach(option => {
      sqlString += ` ${option}`
    })
    sqlString += ` ,`
  })

  sqlString += ' PRIMARY KEY ('
  data.primary.forEach((field, index) => {
    sqlString += `${field}`
    if(index !== data.primary.length-1) sqlString += ','
    else sqlString += ')'
  })

  if(data.unique.length > 0){
    sqlString += `, UNIQUE (`
    data.unique.forEach((field, index) => {
      sqlString += `${field}`
      if(index !== data.unique.length-1) sqlString += ','
      else sqlString += ')'
    })
  }

  if(data.foreign.length > 0){
    data.foreign.forEach((val, i) => {
      sqlString += `, FOREIGN KEY (${val.key}) REFERENCES ${val.ref}(${val.key})`
    })
  }

  sqlString += ');'

  return sqlString
}

migrations.forEach((migration, index) => {
  const jsonString = fs.readFileSync(`./migration/${migration}.json`, 'utf-8')
  if(!jsonString){
    console.log("Error reading migration file")
    return process.exit()
  }
  try {
    let jsonData = JSON.parse(jsonString)
    let sqlString = getSqlString(jsonData)
    conn.query(sqlString, (err) => {
      if(err) throw err
      console.log(`Succesfully created ${migration} table`)
      if(index === migrations.length -1) return process.exit()
    })
  } catch (error) {
    console.log("error parsing json file", error)
  }
})