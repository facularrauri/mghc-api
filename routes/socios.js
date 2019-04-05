const { Router } = require('express')
const Socio = require('../models/socio')
const Hockey = require('../models/hockey')
const Pago = require('../models/pago')
const Futbol = require('../models/futbol')
const checkAuth = require('../middlewares/auth')

const router = new Router()

router.get('/', checkAuth, getSocios)
router.get('/id/:id', checkAuth, getSocioById)
router.get('/lastid', checkAuth, getLastId)
router.post('/', checkAuth, createSocio)
router.put('/:id', checkAuth, updateSocio)

Socio.belongsTo(Hockey, { as: 'hockey', foreignKey: 'socio_id', targetKey: 'socio_id' })
Socio.belongsTo(Futbol, { as: 'futbol', foreignKey: 'socio_id', targetKey: 'socio_id' })
Socio.hasMany(Pago, { as: 'pagos', foreignKey: 'socio_id', targetKey: 'socio_id' })

async function createSocio (req, res, next) {
  try {
    const socio = await Socio.create({
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      categoria: req.body.categoria,
      mail: req.body.mail,
      dni: req.body.dni,
      telcel: req.body.telcel,
      telpar: req.body.telpar,
      telmadre: req.body.telmadre,
      telpadre: req.body.telpadre,
      direccion: req.body.direccion,
      nacimiento: req.body.nacimiento,
      fechaalta: req.body.fechaalta,
      fechabaja: req.body.fechabaja,
      obrasocial: req.body.obrasocial,
      numobrasocial: req.body.numobrasocial,
      act_hockey: req.body.activoh,
      act_futbol: req.body.activof,
      licenciainicio: req.body.licenciainicio,
      licenciafin: req.body.licenciafin
    })
    res.status(200).send(socio)
  } catch (error) {
    res.status(500).send(error)
    next(error)
  }
}

async function updateSocio (req, res, next) {
  try {
    const hockey = await Socio.update({
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      categoria: req.body.categoria,
      mail: req.body.mail,
      dni: req.body.dni,
      telcel: req.body.telcel,
      telpar: req.body.telpar,
      telmadre: req.body.telmadre,
      telpadre: req.body.telpadre,
      direccion: req.body.direccion,
      nacimiento: req.body.nacimiento,
      fechaalta: req.body.fechaalta,
      fechabaja: req.body.fechabaja,
      obrasocial: req.body.obrasocial,
      numobrasocial: req.body.numobrasocial,
      act_hockey: req.body.activoh,
      act_futbol: req.body.activof,
      actividad: req.body.actividad,
      licenciainicio: req.body.licenciainicio,
      licenciafin: req.body.licenciafin
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

async function getSocios (req, res, next) {
  try {
    const socios = await Socio.findAll({
      include: [
        { model: Futbol, as: 'futbol' },
        { model: Hockey, as: 'hockey' },
        { model: Pago, as: 'pagos', order: ['saldo'], limit: 1 }
      ]
    })
    res.status(200).send(socios)
  } catch (error) {
    res.status(500).send(error)
    next(error)
  }
}

async function getSocioById (req, res, next) {
  try {
    let socio = await Socio.findAll({
      where: {
        socio_id: req.params.id
      },
      include: [
        { model: Pago, as: 'pagos', attributes: ['mes', 'fecha', 'credito', 'debito', 'descripcion', ['num_recibo', 'recibo']] },
        { model: Hockey, as: 'hockey' },
        { model: Futbol, as: 'futbol' }
      ]
    })
    res.status(200).send(socio[0])
  } catch (error) {
    res.status(500).send(error)
    next(error)
  }
}

async function getLastId (req, res, next) {
  try {
    const lastId = await Socio.findOne({
      attributes: ['socio_id'],
      order: [
        ['socio_id', 'DESC']
      ]
    })
    res.status(200).send(lastId)
  } catch (error) {
    res.status(500).send(error)
    next(error)
  }
}

module.exports = router
