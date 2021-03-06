const mongoose = require('mongoose')

const { Schema } = mongoose

const Cart = new Schema({
  user: {
    type: Schema.Types.ObjectId, ref: 'User'
  },
  cartItems: [{
    type: Schema.Types.ObjectId, ref: 'Meal'
  }],
  totalQuantity: {
    type: Number
  },
  totalPrice: {
    type: Number
  },
  status: {
    type: String
  }
}, {
  timestamps: true
})

Cart.method('createCart', function (meal, user, status) {
  this.cartItems.push(meal._id)
  this.totalQuantity = this.cartItems.length
  this.totalPrice = meal.pricePerOrderSize
  this.vendor = meal.vendor._id
  this.status = status
  this.user = user._id
  return this.save()
})

module.exports = mongoose.model('Cart', Cart)
