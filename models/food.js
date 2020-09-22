const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodSchema = new Schema({
  name : {
    type : String,
    required: true
  },
  lotNumber : {
    type : String,
    unique : true,
    required : true
  },
  createdAt : {
    type : Date,
    default: Date.now
  },
  cuisine : {
    type : String,
    required: true
  },
  ingredients :{
    type : Array
  },
  costOfProduction : {
    type : Number
  },
  sellingCost : {
    type : Number
  }
})

const Food = mongoose.model('food',foodSchema);
module.exports = Food;