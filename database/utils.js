const { Sequelize } = require('sequelize')

const errorHandling = (e) => {
  let errors = []

  if(e instanceof Sequelize.ForeignKeyConstraintError){
    errors.push({
      key: e.fields[0],
      value: e.value,
      message: `Error! Field ${e.fields[0]} with id ${e.value} does not exist! Please input correctly`
    })
  }else{
    Object.values(e.errors).forEach(err => {
      errors.push({
        key: err.path,
        value: err.value,
        message: err.message
      })
    })
  }

  return { errors }
}

module.exports = { errorHandling }