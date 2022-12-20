const jwt = require('jsonwebtoken')
const { Session } = require('../models')
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

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  const session = await Session.findOne({where: {token: authorization.substring(7)}})
  if (authorization && authorization.toLowerCase().startsWith('bearer ') && session) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)

      if(session.userId != req.decodedToken.id) {
        return res.status(401).json({ error: 'session invalid' })
      }
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