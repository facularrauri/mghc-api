const { Router } = require('express')
const Futbol = require('../models/futbol')
const checkAuth = require('../middlewares/auth')

const router = new Router()

router.post('/', checkAuth, createFutbol)
router.put('/:id', checkAuth, updateFutbol)

async function createFutbol (req, res, next) {
  try {
    const hockey = await Futbol.create({
      socio_id: req.body.socio_id,
      categoria_f: req.body.categoria_f,
      num_camisetaf: req.body.num_camisetaf,
      becaf: req.body.becaf,
      fecha_altaf: req.body.fecha_altaf,
      fecha_bajaf: req.body.fecha_bajaf
    })
    res.status(200).send(hockey)
  } catch (error) {
    res.status(500).send(error)
    next(error)
  }
}

async function updateFutbol (req, res, next) {
  try {
    const futbol = await Futbol.update({
      categoria_f: req.body.categoria_f,
      num_camisetaf: req.body.num_camisetaf,
      becaf: req.body.becaf,
      fecha_altaf: req.body.fecha_altaf,
      fecha_bajaf: req.body.fecha_bajaf
    },
    {
      where: { socio_id: req.params.id }
    })
    res.status(200).send(futbol)
  } catch (error) {
    res.status(500).send(error)
    next(error)
  }
}

module.exports = router
