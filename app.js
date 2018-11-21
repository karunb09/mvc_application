const express = require('express')
const http = require('http')
const expressLayouts = require('express-ejs-layouts')
const favicon = require('serve-favicon')
const path = require('path')
const bodyParser = require('body-parser')
const engines = require('consolidate')
const session = require('express-session')
const errorHandler = require('errorhandler')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const expressValidator = require('express-validator')
const expressStatusMonitor = require('express-status-monitor')
const LOG = require('./utils/logger.js')
const logfile = '/access.log'
const app = express()  // make express app
const port = process.env.PORT  || 8081
const fs = require('fs')


// ADD THESE COMMENTS AND IMPLEMENTATION HERE
// 1 set up the view engine
// 2 include public assets and use bodyParser
// 3 set up the logger
// 4 handle valid GET requests
// 5 handle valid POST request
// 6 respond with 404 if a bad URI is requested
dotenv.load({ path: '.env' })
LOG.info('Environment variables loaded.')
// path to views
app.set('views', path.join(__dirname, 'views')) 
// specify our view engine
app.set('view engine', 'ejs') 
app.engine('ejs',engines.ejs)

// configure middleware.....................................................
// app.use(favicon(path.join(__dirname, '/public/images/favicon.ico')))
app.use(expressStatusMonitor())


// 2 include public assets and use bodyParser
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(expressValidator())
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }))
app.use(expressLayouts)
//app.use(expressLayouts)
app.use(errorHandler()) // load error handler

// 3 log requests to stdout and also
app.use((req, res, next) => {
  LOG.debug('%s %s', req.method, req.url)
  next()
 })

app.get("/", function (req, res) {
  //res.sendFile(path.join(__dirname + '/assets/index.html'))
  res.render("index.ejs")
 })

 app.get("/index", function (req, res) {
  //res.sendFile(path.join(__dirname + '/assets/index.html'))
  res.render("index.ejs")
 })

 app.get("/product", function (req, res) {
  res.render("product.ejs")
 })

 //app.get("/order", function (req, res) {
  //res.render("order.ejs")
 //})

//  app.get("/orderLineItem", function (req, res) {
//   res.render("orderLineItem.ejs")
//  })

 app.get("/customer", function (req, res) {
  res.render("customer.ejs")
 })

 app.get("/about", function (req, res) {
  res.render("aboutus.ejs")
 })

 app.get("/contact", function (req, res) {
  res.render("contactus.ejs")
 })

 app.get("/404", function (req, res) {
  res.render("404.ejs")
 })

 app.get(function (req, res) {
  res.render('404')
}) 



const routes = require('./routes/index.js')
app.use('/', routes)  // load routing
LOG.info('Loaded routing.')

app.use((req, res) => { res.status(404).render('404.ejs') }) // handle page not found errors

// initialize data ............................................
require('./utils/seeder.js')(app)  // load seed data
 
 // Listen for an application request on designated port
 app.listen(port, function () {
  console.log('Web app started and listening on http://localhost:' + port)
  console.log('\nLogs will be sent to this terminal and ' + logfile + '.')
 })