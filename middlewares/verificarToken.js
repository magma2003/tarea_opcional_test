const jwt = require('jsonwebtoken')
const { secretKey } = require('../utils')

const verificarToken = (req, res, next) => {
  const authorization = req.headers.authorization

  // No viene token
  if (!authorization) {
    return res.status(401).json({ message: 'Token no proporcionado' })
  }

  // "Bearer token"
  const token = authorization.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Token inválido' })
  }

  try {
    const decoded = jwt.verify(token, secretKey)
    req.user = decoded
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' })
  }
}

module.exports = { verificarToken }
