const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { Router } = require('express')
const User = require('../models/user')

const config = require('../config/')

const router = new Router()

router.post('/token', singIn)

async function singIn (req, res, next) {
  try {
    if (!req.body.username) {
      return res.status(404).send({ Error: 'Debe ingresar un nombre de usuario' })
    }

    if (!req.body.password) {
      return res.status(404).send({ Error: 'Debe ingresar un password' })
    }

    const user = await User.findOne({
      where: { username: req.body.username }
    })

    if (!user) return res.status(404).send({ Error: 'No se encontro el usuario' })

    bcrypt.compare(`${req.body.password}`, user.password).then(response => {
      if (!response) return res.status(401).send({ Error: 'Password invalido' })

      const payload = {
        name: user.username,
        id: user.user_id
      }

      const token = jwt.sign(payload, config.secretToken, { expiresIn: '90d' })
      res.status(201).send({ token: `Bearer ${token}` })
    })
  } catch (error) {
    res.status(500).send(error)
    next(error)
  }
}

module.exports = router
