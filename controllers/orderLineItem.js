/**
 * orderLineItemItem controller
 * @author Karun, Bourishetty */

const express = require('express')
const api = express.Router()
const Model = require('../models/orderLineItem.js')
const LOG = require('../utils/logger.js')
const find = require('lodash.find')
const remove = require('lodash.remove')
const notfoundstring = 'orderLineItem'

api.get('/findall', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    const data = req.app.locals.orderLineItem.query
    res.send(JSON.stringify(data))
  })

  api.get('/findone/:id', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    const id = parseInt(req.params.id, 10)  // for bases 10 values
    const data = req.app.locals.orderLineItem.query
    const item = find(data, { orderID: id })
    if (!item) { return res.end(notfoundstring) }
    res.send(JSON.stringify(item))
  })

  api.get('/', (req, res) => {
    res.render('orderLineItem/index.ejs')
    //res.send("success")
  })
  api.get('/create', (req, res) => {
    LOG.info(`Handling GET /create${req}`)
    const item = new Model()
    LOG.debug(JSON.stringify(item))
    res.render('orderLineItem/create',
      {
        title: 'Create orderLineItem',
        layout: 'layout.ejs',
        orderLineItem: item
      })
  })
  api.get('/delete/:id', (req, res) => {
    LOG.info(`Handling GET /delete/:id ${req}`)
    const id = parseInt(req.params.id, 10) // base 10
    const data = req.app.locals.orderLineItem.query
    const item = find(data, { orderID: id })
    if (!item) { return res.end(notfoundstring) }
    LOG.info(`RETURNING VIEW FOR ${JSON.stringify(item)}`)
    return res.render('orderLineItem/delete.ejs',
      {
        title: 'Delete orderLineItem',
        layout: 'layout.ejs',
        orderLineItem: item
      })
  })
  // GET /details/:id
api.get('/details/:id', (req, res) => {
    LOG.info(`Handling GET /details/:id ${req}`)
    const id = parseInt(req.params.id, 10) // base 10
    const data = req.app.locals.orderLineItem.query
    const item = find(data, { orderID: id })
    if (!item) { return res.end(notfoundstring) }
    LOG.info(`RETURNING VIEW FOR ${JSON.stringify(item)}`)
    return res.render('orderLineItem/read.ejs',
      {
        title: 'orderLineItem Details',
        layout: 'layout.ejs',
        orderLineItem: item
      })
  })

  // GET one
api.get('/edit/:id', (req, res) => {
    LOG.info(`Handling GET /edit/:id ${req}`)
    const id = parseInt(req.params.id, 10) // base 10
    const data = req.app.locals.orderLineItem.query
    const item = find(data, { orderID: id })
    if (!item) { return res.end(notfoundstring) }
    LOG.info(`RETURNING VIEW FOR${JSON.stringify(item)}`)
    return res.render('orderLineItem/edit.ejs',
      {
        title: 'orderLineItem',
        layout: 'layout.ejs',
        orderLineItem: item
      })
  })

  // HANDLE EXECUTE DATA MODIFICATION REQUESTS --------------------------------------------

// POST new
api.post('/save', (req, res) => {
    LOG.info(`Handling POST ${req}`)
    LOG.debug(JSON.stringify(req.body))
    const data = req.app.locals.orderLineItem.query
    const item = new Model()
    LOG.info(`NEW ID ${req.body.orderID}`)
    item.orderID = parseInt(req.body.orderID, 10) // base 10
    item.lineNumber = parseInt(req.body.lineNumber, 10)
    item.productName = req.body.productName
    item.quantity = parseInt(req.body.quantity, 10)

      data.push(item)
      LOG.info(`SAVING NEW orderLineItem ${JSON.stringify(item)}`)
      return res.redirect('/orderLineItem')
    }
  )

  // POST update
api.post('/save/:id', (req, res) => {
    LOG.info(`Handling SAVE request ${req}`)
    const id = parseInt(req.params.id, 10) // base 10
    LOG.info(`Handling SAVING ID=${id}`)
    const data = req.app.locals.orderLineItem.query
    const item = find(data, { orderID: id })
    if (!item) { return res.end(notfoundstring) }
    LOG.info(`ORIGINAL VALUES ${JSON.stringify(item)}`)
    LOG.info(`UPDATED VALUES: ${JSON.stringify(req.body)}`)
    //item.orderID = parseInt(req.body.orderID, 10) // base 10
    item.lineNumber = parseInt(req.body.lineNumber, 10)
    item.productName = req.body.productName
    item.quantity = parseInt(req.body.quantity, 10)
    LOG.info(`SAVING UPDATED orderLineItem ${JSON.stringify(item)}`)
    return res.redirect('/orderLineItem')
    
  })

  // DELETE id (uses HTML5 form method POST)
api.post('/delete/:id', (req, res) => {
    LOG.info(`Handling DELETE request ${req}`)
    const id = parseInt(req.params.id, 10) // base 10
    LOG.info(`Handling REMOVING ID=${id}`)
    const data = req.app.locals.orderLineItem.query
    const item = find(data, { orderID: id })
    if (!item) {
      return res.end(notfoundstring)
    }
    if (item.isActive) {
      item.isActive = false
      console.log(`Deacctivated item ${JSON.stringify(item)}`)
    } else {
      const item = remove(data, { orderID: id })
      console.log(`Permanently deleted item ${JSON.stringify(item)}`)
    }
    return res.redirect('http://localhost:8081/orderLineItem')
  })
  module.exports = api
  