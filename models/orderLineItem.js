/**
 * Product schema to store product details by using mongoose 
 * @author Bourishetty, Karun
 */
const mongoose = require('mongoose')
const orderLineItemSchema = new mongoose.Schema({
  _orderID: {
    type: Number,
    required: true
  },

  orderlineNumber: {
    type: Number,
    required: true
  },

  productName: {
    type: String,
    required: true
  },
  
  quantity: {
    type: Number,
    required: true, 
    default: 1
  }
})
module.exports = mongoose.model('orderLineItem', orderLineItemSchema)