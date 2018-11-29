/**
 * This schema is basically the Customer details.
 * @author Hyndavi,Musipatla
 */
const mongoose = require('mongoose')

const CustomerSchema = new mongoose.Schema({

  _customerid: { type: Number, required: true },
  customername: {
    type: String,
    required: true,
    default: 'Gary Mehigan'
  },
  customerAddress: {
    type: String,
    required: false,
    default: 'Flat No:106,Horizons'
  },
  customerPhoneNumber: {
    type: Number,
    required: false,
    default: '6605280901'
  },
  customerEmail:
  {
    type: String,
    required: false,
    default: 'hyndavi@gmail.com'
  }

})
module.exports = mongoose.model('customers', CustomerSchema)