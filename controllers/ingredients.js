const Ingredient = require('../models/ingredients');
const shortid = require('shortid');

module.exports = {

  getNewIngredient: async (req, res, next) => {
    try {
      res.status(200).json({
        message: 'Response Success for empty form'
      })
    }
    catch (err) {
      res.status(500)
      res.json({
        message: 'Error in fetching data'
      })
    }
  },

  getAllIngredients: async (req, res, next) => {
    try {
      var ingredientData = await Ingredient.find({});
      res.status(200).json({
        message: 'Complete Ingredient Data',
        data : ingredientData
      })
    }
    catch (err) {
      console.log(err);
      res.status(500);
      res.json({
        message: 'Error in fetching ingredient data'
      })
    }
  },

  getSelectiveIngredient: async (req, res, next) => {
    try {
      var selectedIngredient = await Ingredient.findOne({ _id: req.params.id });
      if(selectedIngredient){
        res.status(200).json({
          success : true,
          message: 'Selected ingredient is fetched',
          data : selectedIngredient
        })
      }
      else{
        res.status(400).json({
          success : false,
          message: 'Ingredient does not exist on this id',
          data : selectedIngredient
        })
      }    
    }
    catch (err) {
      console.log(err);
      res.status(500);
      res.json({
        success : false,
        message: 'Error in fetching ingredient data'
      })
    }
  },

  getthresholdLessIngredient : async (req, res, next) => {
    try{
      var lessAvailable = await Ingredient.find( { $expr: { $gt: [ "$thresholdQuantity" , "$availableQuantity" ] } } );
      res.status(200).json({
        success : true,
        message: 'Ingredient with available quantity less than the threshold quantity',
        data : lessAvailable
      })
    }
    catch(err){
      console.log(err);
      res.status(500)
      res.json({
        success : false,
        message: 'Error in fetching available quantity less than the threshold quantity'
      })
    }
  },

  sameVendor: async (req, res, next) => {
    try{
      console.log(req.params.name);
      var ingredientData = await Ingredient.find({vendorName : req.params.name});
      console.log(ingredientData);
      res.status(200).json({
        success:true,
        message: 'Ingredients by selected vendor',
        data : ingredientData
      })
    }
    catch(err){
      res.status(500).json({
        success:false,
        message: 'Error in fetching ingredient data',
        data : ingredientData
      })
    }
  },

  saveIngredient: async (req, res, next) => {
    try{
      const newIngredient = new Ingredient({
        name : req.body.name,
        availableQuantity : req.body.availableQuantity,
        thresholdQuantity : req.body.thresholdQuantity,
        price : req.body.price,
        vendorName : req.body.vendorName,
        vendorEmail : req.body.vendorEmail
      });
      newIngredient.save()
      .then(ingredient => {
        res.json({
          success : true,
          message: 'Ingredient created!'
        })
      })
      .catch(err => {
        console.log(err);
        res.status(500)
        res.json({
          success : false,
          message: 'Cannot save new Ingredient!'
        })
      })
    }
    catch(err){
      console.log(err);
      res.status(500)
      res.json({
        success : false,
        message: 'Cannot create new Ingredient'
      })
    }
  },

  updateIngredient: async (req, res, next) => {
    try{
      var updateIngredient = await Ingredient.findOneAndUpdate({_id:req.params.id},{
        name : req.body.name,
        availableQuantity : req.body.availableQuantity,
        thresholdQuantity : req.body.thresholdQuantity,
        price : req.body.price,
        vendorName : req.body.vendorName,
        vendorEmail : req.body.vendorEmail
      });
      console.log("-------updateIngredient------------");
      console.log(updateIngredient);
      if(updateIngredient){
        res.json({
          success : true,
          message: 'Ingredient updated!'
        })
       }
       else{
         res.status(400);
        res.json({
          success : false,
          message: 'Ingredient does not exists for the selected id'
        })
       }
    }
    catch(err){
      console.log("=====Error in updating ingredient======");
      console.log(err);
      res.status(500);
      res.json({
        success : false,
        message: 'Cannot update ingredient!'
      })
    }
  },

  deleteIngredient: async (req, res, next) => {
    try{
      var deleteIngredient = await Ingredient.findOneAndDelete({_id:req.params.id});
      console.log("------deleteFood-----------");
      console.log(deleteIngredient);
      if(deleteIngredient){
       res.json({
         success : true,
         message: 'Ingredient deleted!'
       })
      }
      else{
      res.status(400);
      res.json({
         success : false,
         message: 'Ingredient does not exists for the selected id'
       })
      }
 
     }
     catch(err){
       console.log("=====Error in deleting ingredient======");
       console.log(err);
       res.status(500);
       res.json({
         success : false,
         message: 'Cannot delete ingredient!'
       })
     }
  },

}