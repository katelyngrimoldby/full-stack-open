const errorHandler = (err, req, res, next) => {
  const errorMessages = err.errors.map((error) => {
    return  error.message
  })
  res.status(400).json({errors: errorMessages})

  next(err)
}

module.exports = {
  errorHandler
}