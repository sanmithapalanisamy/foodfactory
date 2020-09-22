const Food = require('../models/food');
const Order = require('../models/orders');
const shortid = require('shortid');
const uniqid = require('uniqid');

module.exports = {

  getFoodForm: async (req, res, next) => {
    try {
      res.status(200).json({
        message: 'Response Success for food form'
      })
    }
    catch (err) {
      res.json({
        message: 'Error in fetching data'
      })
    }
  },

  getAllFood : async (req, res, next) => {
    try {
      var foodData = await Food.find({});
      res.status(200).json({
        success : true,
        message: 'Complete Food Data',
        data : foodData
      })
    }
    catch (err) {
      res.json({
        success : false,
        message: 'Error in fetching food data'
      })
    }
  },

  getSelectiveFood : async (req, res, next) => {
    try {
      var selectedFood = await Food.findOne({ _id: req.params.id });
      if(selectedFood){
      res.status(200).json({
        success : true,
        message: 'Selected food data is fetched',
        data : selectedFood
      })
    }
    else{
      res.status(400).json({
        success : false,
        message: 'Selected food id does not exists',
        data : selectedFood
      })
    }
    }
    catch (err) {
      console.log(err);
      res.json({
        success : false,
        message: 'Error in fetching food data'
      })
    }
  },

  gethighCostOfProduction : async (req, res, next) => {
    console.log("=====gethighCostOfProduction==========");
    try {
      var highCostProduction = await Food.find( { $expr: { $gt: [ "$costOfProduction" , "$sellingCost" ] } } );
      res.status(200).json({
        success : true,
        message: 'Food with high cost of production than selling cost',
        data : highCostProduction
      })
    }
    catch (err) {
      console.log("=========error in high cost of production data ===============");
      console.log(err);
      res.json({
        success : false,
        message: 'Error in fetching gethighCostOfProduction food data'
      })
    }
  },

  // saveOrder : async (req, res, next) => {
  //   try{
  //     const newOrder = new Order({
  //       orderNum : uniqid(),
  //       dateOfDelivery : req.body.dateOfDelivery,
  //       modeOfTransport : req.body.modeOfTransport,
  //       userData : {
  //         name : req.session.passport.user.name,
  //         email : req.session.passport.user.email
  //       }
  //     });
  //     newOrder.items.push(req.params.id);
  //     newOrder.save()
  //     .then(order => {
  //       res.json({
  //         success : true,
  //         message: 'Order Placed!'
  //       })
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     res.status(500);
  //       res.json({
  //         success : false,
  //         message: 'Cannot create new order!'
  //       })
  //     })
  //   }
  //   catch(err){
  //     console.log(err);
  //     res.status(500);
  //     res.json({
  //       success : false,
  //       message: 'Error in creating new order'
  //     })
  //   }
  // },

 

  saveFood: async (req, res, next) => {
    try{
      const newFood = new Food({
        name : req.body.name,
        cuisine : req.body.cuisine,
        lotNumber : shortid.generate(),
        ingredients : req.body.ingredients,
        costOfProduction : req.body.costOfProduction,
        sellingCost : req.body.sellingCost
      });
      newFood.save()
      .then(food => {
        res.json({
          success : true,
          message: 'Food Item created!'
        })
      })
      .catch(err => {
        console.log(err);
        res.json({
          success : false,
          message: 'Cannot save new food!'
        })
      })
    }
    catch(err){
      console.log(err);
      res.json({
        success : false,
        message: 'Cannot create new food item'
      })
    }
  },

  updateFood: async (req, res, next) => {
    try{
      var updateFood = await Food.findOneAndUpdate({_id:req.params.id},{
        name : req.body.name,
        cuisine : req.body.cuisine,
        ingredients : req.body.ingredients,
        costOfProduction : req.body.costOfProduction,
        sellingCost : req.body.sellingCost
      });
      console.log("-------updateFood------------");
      console.log(updateFood);
      if(updateFood){
        res.json({
          success : true,
          message: 'Food Item updated!'
        })
       }
       else{
        res.json({
          success : false,
          message: 'Food item does not exists for the selected id'
        })
       }
    }
    catch(err){
      console.log("=====Error in updating food item======");
      console.log(err);
      res.json({
        success : false,
        message: 'Cannot update food item!'
      })
    }
  },

  deleteFood: async (req, res, next) => {
    try{
     var deleteFood = await Food.findOneAndDelete({_id:req.params.id});
     console.log("------deleteFood-----------");
     console.log(deleteFood);
     if(deleteFood){
      res.json({
        success : true,
        message: 'Food Item deleted!'
      })
     }
     else{
      res.json({
        success : false,
        message: 'Food item does not exists for the selected id'
      })
     }

    }
    catch(err){
      console.log("=====Error in deleting food item======");
      console.log(err);
      res.json({
        success : false,
        message: 'Cannot delete food item!'
      })
    }
  },

}