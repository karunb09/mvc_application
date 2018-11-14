/**
 * Product schema to store product details by using mongoose 
 * @author Bourishetty, Karun
 */
const mongoose = require('mongoose')
const orderLineSchema = new mongoose.Schema({
  orderID: {
    type: Number,
    required: true
  },

  OrderlineNumber: {
    type: Number,
    required: true
  },

  productID: {
    type: String,
    required: true
  },
  
  quantity: {
    type: Number,
    required: true, 
    default: 1
  }
})
module.exports = mongoose.model('orderLine', orderLineSchema)