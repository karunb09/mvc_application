/**
 * Product schema to store all product details by using mongoose 
 * @author Veeramachini, Subhash.
 */
const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({

  _productid: { type: Number, required: true },
  productName: {
    type: String,
    required: true,
    default: 'Chicken-Biryani'
  }, 
  productDescription: {
    type: String,
    required: true,
    default: 'Biryani'
  }, 
  price: {
    type: Number,
    required: false,
    default:600
  },
  productCategory: { 
    type: String,
    required: true,
    default: 'Indian-Cuisine'
  },
  sellerId: { 
    type: Number,
    required: true,
  }
})
module.exports = mongoose.model('Product', ProductSchema)