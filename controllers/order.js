/**
 * Order Controller:This controller handles the request of order
 * @ Author: Sonam Gadekari
 */


const express = require('express')
const api = express.Router()
const Model = require('../models/order.js')
const LOG = require('../utils/logger.js')
const find = require('lodash.find')
const remove = require('lodash.remove')
const notfoundstring = 'order'

// JSON data is used to repsond

// GET all JSON
api.get('/findall', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  const data = req.app.locals.order.query
  res.send(JSON.stringify(data))
})


// vieews are used to respond

// GET to this controller base URI (the default)
api.get('/', (req, res) => {

  res.render('order/index.ejs',{
    title: 'Index',
    layout: 'layout.ejs'
  })
})

// GET one JSON by ID
api.get('/findone/:id', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  const id = parseInt(req.params.id, 10) // base 10
  const data = req.app.locals.order.query
  const item = find(data, { _id: id })
  if (!item) { return res.end(notfoundstring) }
  res.send(JSON.stringify(item))
})

// GET create
api.get('/order/create', (req, res) => {
  LOG.info(`Handling GET /create${req}`)
  const item = new Model()
  LOG.debug(JSON.stringify(item))
  res.render('order/create.ejs',
    {
      title: 'Create order',
      layout: 'layout.ejs',
      order: item
    })
})

// GET /delete/:id
api.get('/delete/:id', (req, res) => {
  LOG.info(`Handling GET /delete/:id ${req}`)
  const id = parseInt(req.params.id, 10) // base 10
  const data = req.app.locals.order.query
  const item = find(data, { _id: id })
  if (!item) { return res.end(notfoundstring) }
  LOG.info(`RETURNING VIEW FOR ${JSON.stringify(item)}`)
  return res.render('order/delete.ejs',
    {
      title: 'Delete order',
      layout: 'layout.ejs',
      order: item
    })
})



// Data can be modified here

// POST new
api.post('/save', (req, res) => {
  LOG.info(`Handling POST ${req}`)
  LOG.debug(JSON.stringify(req.body))
  const data = req.app.locals.order.query
  const item = new Model()
  LOG.info(`NEW ID ${req.body._id}`)
  item._id = parseInt(req.body._id, 10) // base 10
  item.name = req.body.name
  item.breed = req.body.breed
  item.age = parseInt(req.body.age, 10)
  item.parents = []
  item.parents.length = 0
  if (req.body.parentName.length > 0) {
    for (let count = 0; count < req.body.parentName.length; count++) {
      item.parents.push(
        {
          parentName: req.body.parentName[count],
          parentBreed: req.body.parentBreed,
          parentAge: parseInt(req.body.parentAge[count], 10)
        }
      )
    }
    data.push(item)
    LOG.info(`SAVING NEW order ${JSON.stringify(item)}`)
    return res.redirect('/order')
  }
})
// GET /details/:id
api.get('/details/:id', (req, res) => {
  LOG.info(`Handling GET /details/:id ${req}`)
  const id = parseInt(req.params.id, 10) // base 10
  const data = req.app.locals.order.query
  const item = find(data, { _id: id })
  if (!item) { return res.end(notfoundstring) }
  LOG.info(`RETURNING VIEW FOR ${JSON.stringify(item)}`)
  return res.render('order/details.ejs',
    {
      title: 'order Details',
      layout: 'layout.ejs',
      order: item
    })
})


// DELETE id (uses HTML5 form method POST)
api.post('/delete/:id', (req, res) => {
  LOG.info(`Handling DELETE request ${req}`)
  const id = parseInt(req.params.id, 10) // base 10
  LOG.info(`Handling REMOVING ID=${id}`)
  const data = req.app.locals.order.query
  const item = find(data, { _id: id })
  if (!item) {
    return res.end(notfoundstring)
  }
  if (item.isActive) {
    item.isActive = false
    console.log(`Deacctivated item ${JSON.stringify(item)}`)
  } else {
    const item = remove(data, { _id: id })
    console.log(`Permanently deleted item ${JSON.stringify(item)}`)
  }
  return res.redirect('/order')
})

module.exports = api