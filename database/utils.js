const errorHandling = (e) => {
  let errors = []

  Object.values(e.errors).forEach(err => {
    errors.push({
      key: err.path,
      value: err.value,
      message: err.message
    })
  })

  return { errors }
}

module.exports = { errorHandling }