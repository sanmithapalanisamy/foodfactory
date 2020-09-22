const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  orderNum : {
    type : String,
    unique: true
  },
  status : {
    type : String,
    enum : ['Pending', 'Shipped', 'Delivered', 'Canceled'],
    default: 'Pending'
  },
  orderDate : {
    type : Date,
    default : Date.now()
  },
  dateOfDelivery : {
    type : Date,
    min : Date.now(),
    required : true
  },
  modeOfTransport : {
    type : String
  },
  userData : {
    name : String,
    email : String
  },
  items : [{
    type : Schema.Types.ObjectId,
    ref : "food"
  }]
})

const Order = mongoose.model('order',orderSchema);
module.exports = Order;