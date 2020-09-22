const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
  name : {
    type : String,
    required: true
  },
  availableQuantity : {
    type : Number,
    required: true
  },
  thresholdQuantity : {
    type : Number,
    required: true
  },
  price : {
    type : Number,
    required : true
  },
  vendorName : {
    type : String,
    required: true
  },
  vendorEmail : {
    type : String,
    required: true
  }
})

const Ingredient = mongoose.model('ingredient',ingredientSchema);
module.exports = Ingredient;