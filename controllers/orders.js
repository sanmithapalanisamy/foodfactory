const Order = require('../models/orders');
const User = require('../models/users');
const uniqid = require('uniqid');
module.exports = {

  getMyOrders: async (req, res, next) => {
    try {
      var ordersData = await Order.find({'userData.email' : req.session.passport.user.email}).populate({path:"items"})
      res.status(200).json({
        success : true,
        message: 'Complete data of your orders ',
        data : ordersData
      })
    }
    catch (err) {
      console.log(err);
      res.status(500);
      res.json({
        success : false,
        message: 'Cannot fetch orders of yours'
      })
    }
},

  getUserOrders: async (req, res, next) => {
      try {
        var userQuery = await User.findOne({_id : req.params.userId});
        if(userQuery){
          var ordersData = await Order.find({'userData.email' : userQuery.email}).populate({path:"items"})
          res.status(200).json({
            success : true,
            message: 'Complete orders data by an user',
            data : ordersData
          })
        }
        else{
          res.status(400).json({
            success : false,
            message: 'Selected user id does not exists',
            data : []
          })
        }
      }
      catch (err) {
        console.log(err);
        res.status(500);
        res.json({
          success : false,
          message: 'Cannot fetch orders by an user'
        })
      }
  },

  getSelectiveOrder: async (req, res, next) => {
    try {
      var selectedOrder = await Order.find({ _id: req.params.orderId }).populate({path:'items'});
      if(req.session.passport.user.role == 'admin' || req.session.passport.user.email == selectedOrder.userData.email  ){
        res.status(200).json({
          message: 'Selected order data is fetched',
          data : selectedOrder
        })
      }
      else{
        res.status(401).json({
          message: 'Do not have access to this order',
          data : []
        })
      }

    }
    catch (err) {
      console.log(err);
      res.status(500);
      res.json({
        message: 'Error in fetching order data'
      })
    }
  },

  getAllOrders: async (req, res, next) => {
    try {
      var ordersData = await Order.find({}).populate({path:"items"})
      res.status(200).json({
        success : true,
        message: 'Complete data of orders by all users ',
        data : ordersData
      })
    }
    catch (err) {
      console.log(err);
      res.status(500);
      res.json({
        success : false,
        message: 'Cannot fetch orders details'
      })
    }
},

  saveOrder: async (req, res, next) => {
    try{
      const newOrder = new Order({
        orderNum : uniqid(),
        dateOfDelivery : req.body.dateOfDelivery,
        modeOfTransport : req.body.modeOfTransport,
        userData : {
          name : req.session.passport.user.name,
          email : req.session.passport.user.email
        },
        items : req.body.foodid
      });
      // newOrder.items.push(req.body.foodid);
      newOrder.save()
      .then(order => {
        res.json({
          success : true,
          message: 'Order Placed!'
        })
      })
      .catch(err => {
        console.log(err);
      res.status(500);
        res.json({
          success : false,
          message: 'Cannot create new order!'
        })
      })
    }
    catch(err){
      console.log(err);
      res.status(500);
      res.json({
        success : false,
        message: 'Error in creating new order'
      })
    }
  },

  updateMyOrder: async (req, res, next) => {
    try{
      var updateOrder = await Order.findOneAndUpdate({_id:req.params.orderId, status:"Pending"},{
        dateOfDelivery : req.body.dateOfDelivery,
        modeOfTransport : req.body.modeOfTransport,
        items : req.body.foodid,
      });
      console.log("-------updateOrder------------");
      console.log(updateOrder);
      if(updateOrder){
        res.json({
          success : true,
          message: 'Order updated!'
        })
       }
       else{
         res.status(400);
        res.json({
          success : false,
          message: 'Order does not exists for the selected id'
        })
       }
    }
    catch(err){
      console.log("=====Error in updating order======");
      console.log(err);
      res.status(500);
      res.json({
        success : false,
        message: 'Cannot update order'
      })
    }
  },

  cancelMyOrder: async (req, res, next) => {
    try{
      var updateOrder = await Order.findOneAndUpdate({_id:req.params.orderId, status : {$in :["Pending","Shipped"]}},{
          status : 'Canceled',
      });
      console.log("-------updateOrder------------");
      console.log(updateOrder);
      if(updateOrder){
        res.json({
          success : true,
          message: 'Order canceled!'
        })
       }
       else{
         res.status(400);
        res.json({
          success : false,
          message: 'Order does not exists for the selected id'
        })
       }
    }
    catch(err){
      console.log("=====Error in updating order======");
      console.log(err);
      res.status(500);
      res.json({
        success : false,
        message: 'Cannot cancel order'
      })
    }
  },

  updateOrder: async (req, res, next) => {
    try{
      var updateOrder = await Order.findOneAndUpdate({_id:req.params.orderId},{
          status : req.body.status,
          modeOfTransport : req.body.modeOfTransport
      });
      console.log("-------updateOrder------------");
      console.log(updateOrder);
      if(updateOrder){
        res.json({
          success : true,
          message: 'Order updated!'
        })
       }
       else{
         res.status(400);
        res.json({
          success : false,
          message: 'Order does not exists for the selected id'
        })
       }
    }
    catch(err){
      console.log("=====Error in updating order======");
      console.log(err);
      res.status(500);
      res.json({
        success : false,
        message: 'Cannot update order'
      })
    }
  },

  deleteOrder: async (req, res, next) => {
    try{
      var deleteOrder = await Order.findOneAndDelete({_id:req.params.orderId});
      if(deleteOrder){
       res.json({
         success : true,
         message: 'Order deleted!'
       })
      }
      else{
        res.status(400);
       res.json({
         success : false,
         message: 'Order does not exists for the selected id'
       })
      }
 
     }
     catch(err){
       console.log("=====Error in deleting order======");
       console.log(err);
       res.stauts(500);
       res.json({
         success : false,
         message: 'Cannot delete order!'
       })
     }
  },

}