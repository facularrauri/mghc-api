const { Router } = require('express')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const saltRounds = 16

const router = new Router()

router.post('/', createUser)
router.put('/:username', updateUser)

async function createUser (req, res, next) {
  try {
    let password = req.body.password
    bcrypt.hash(password, saltRounds)
      .then(async (hash) => {
        const socio = await User.create({
          username: req.body.username,
          password: hash
        })
        res.status(200).send(socio)
      })
  } catch (error) {
    res.status(500).send(error)
    next(error)
  }
}

async function updateUser (req, res, next) {
  try {
    let password = req.body.password
    bcrypt.hash(password, saltRounds)
      .then(async (hash) => {
        await User.update({
          password: hash
        },
        {
          where: { username: req.params.username }
        })
        res.status(200).send('Actualizado')
      })
  } catch (error) {
    res.status(500).send(error)
    next(error)
  }
}

module.exports = router
