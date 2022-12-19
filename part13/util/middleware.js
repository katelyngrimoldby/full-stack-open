const jwt = require('jsonwebtoken')
const {SECRET} = require('../util/config')

const errorHandler = (err, req, res, next) => {
  
  if(err.name === "SequelizeValidationError") {
    const errorMessages = err.errors.map((error) => {
      return  error.message
    })
    res.status(400).json({errors: errorMessages})
  }

  next(err)
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch{
      return res.status(401).json({ error: 'token invalid' })
    }
  }  else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

module.exports = {
  errorHandler,
  tokenExtractor
}