const { Router } = require('express')
const Pago = require('../models/pago')
const Socio = require('../models/socio')
const guemes = require('../db/dbConnect')
const checkAuth = require('../middlewares/auth')

const router = new Router()

Socio.hasMany(Pago, { foreignKey: 'socio_id' })

router.get('/id/:id', checkAuth, getPays)
router.get('/lastreceipt', checkAuth, getLastReceipt)
router.post('/', checkAuth, createPay)
router.put('/', checkAuth, updatePay)
router.post('/remove', checkAuth, removePay)
router.get('/:month', checkAuth, getMonthTotals)

async function getMonthTotals (req, res, next) {
  try {
    const total = await guemes.query(`CALL saldo_mes(:mes)`, { replacements: { mes: req.params.month } })
    res.status(200).send(total)
  } catch (error) {
    res.status(500).send(error)
    next(error)
  }
}

async function getPays (req, res, next) {
  try {
    const pagos = await Pago.findAll({
      where: {
        socio_id: req.params.id
      }
    })
    res.status(200).send(pagos)
  } catch (error) {
    res.status(500).send(error)
    next(error)
  }
}

async function createPay (req, res, next) {
  try {
    const pago = await Pago.create({
      socio_id: req.body.socio_id,
      mes: req.body.mes,
      credito: req.body.credito,
      fecha: req.body.fecha,
      descripcion: req.body.descripcion
    })
    guemes.query(`CALL saldo(:id)`, { replacements: { id: req.body.socio_id } })
    res.status(200).send(pago)
  } catch (error) {
    res.status(500).send(error)
    next(error)
  }
}

async function updatePay (req, res, next) {
  try {
    const pago = await Pago.update({
      socio_id: req.body.socio_id,
      mes: req.body.mes,
      credito: req.body.credito,
      fecha: req.body.fecha,
      descripcion: req.body.descripcion
    }, {
      where: { num_recibo: req.body.num_recibo }
    })
    guemes.query(`CALL saldo(:id)`, { replacements: { id: req.body.socio_id } })
    res.status(200).send(pago)
  } catch (error) {
    res.status(500).send(error)
    next(error)
  }
}

async function removePay (req, res, next) {
  try {
    await Pago.destroy({
      where: {
        num_recibo: req.body.num_recibo,
        socio_id: req.body.socio_id
      }
    })
    guemes.query(`CALL saldo(:id)`, { replacements: { id: req.body.socio_id } })
    // if (pago) res.status(200).send(pago)
    res.end()
  } catch (error) {
    res.status(500).send(error)
    next(error)
  }
}

async function getLastReceipt (req, res, next) {
  try {
    const lastReceipt = await Pago.findOne({
      attributes: ['num_recibo'],
      order: [
        ['num_recibo', 'DESC']
      ]
    })
    res.status(200).send(lastReceipt)
  } catch (error) {
    res.status(500).send(error)
    next(error)
  }
}
module.exports = router
