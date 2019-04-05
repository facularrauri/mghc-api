const jwt = require('jsonwebtoken')
const config = require('../config/')

function checkAuth (req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1]
    jwt.verify(token, config.secretToken)
    next()
  } catch (error) {
    return res.status(401).json({
      message: 'Auth failed'
    })
  }
}

module.exports = checkAuth
