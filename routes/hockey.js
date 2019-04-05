const { Router } = require('express')
const Hockey = require('../models/hockey')
const checkAuth = require('../middlewares/auth')

const router = new Router()

router.post('/', checkAuth, createHockey)
router.put('/:id', checkAuth, updateHockey)

async function createHockey (req, res, next) {
  try {
    const hockey = await Hockey.create({
      socio_id: req.body.socio_id,
      tira: req.body.tira,
      categoria_h: req.body.categoria_h,
      num_fichaje: req.body.num_fichaje,
      num_camiseta: req.body.num_camiseta,
      beca: req.body.beca,
      fecha_alta: req.body.fecha_alta,
      fecha_baja: req.body.fecha_baja
    })
    res.status(200).send(hockey)
  } catch (error) {
    res.status(500).send(error)
    next(error)
  }
}

async function updateHockey (req, res, next) {
  try {
    const hockey = await Hockey.update({
      tira: req.body.tira,
      categoria_h: req.body.categoria_h,
      num_fichaje: req.body.num_fichaje,
      num_camiseta: req.body.num_camiseta,
      beca: req.body.beca,
      fecha_alta: req.body.fecha_alta,
      fecha_baja: req.body.fecha_baja
    },
    {
      where: { socio_id: req.params.id }
    })
    res.status(200).send(hockey)
  } catch (error) {
    res.status(500).send(error)
    next(error)
  }
}

module.exports = router
