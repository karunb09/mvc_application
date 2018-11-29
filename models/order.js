/**
 * This schema is basically the Order details of customer.
 * Orders schema gives information about order details of customers such as 
 * order id,name,date,shipping address,delivery details and amount to be paid.
 * @author Sonam,Gadekari
 */

const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({

 _orderid: { 
 type: Number,
 required: true
 },
  ordername: {
    type: String,
    required: true,
    default: 'Chicken Biriyani'
  },
  orderdate: {
    type: Date,
    required: true,
    default: Date.now
  },
  shippingAdress: {
    type: String,
    required: false,
    default: 'H.No:78-110,kurnool'
  },
  deliveryDetails: {
    type: String,
    required: false,
    default: 'ABC delivery Company,Executive: Ram'
  },
  //_productID: { type: OrdersSchema.Types.ObjectId, ref: 'Product' }, 
  cashOnDelivery: {
    type: Number,
    required: true,
    default:0.0
  }
  
})
module.exports = mongoose.model('Order', orderSchema)