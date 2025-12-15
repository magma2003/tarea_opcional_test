const jwt = require('jsonwebtoken')
const { secretKey } = require('../utils')

const login = (req, res) => {
 const { username, password } = req.body

  if (username !== 'admin' || password !== '1234') {
    return res.status(400).json({ message: 'Credenciales incorrectas' })
  }

  const payload = { username }

  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' })

  res.json({ token })
}

module.exports = { login }