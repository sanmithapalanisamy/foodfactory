const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/orders");
const authUser = require("../helpers/authentication");
const validation = require("../helpers/validation");
const Order  = require('../models/orders');


router.get('/', authUser.isLoggedIn, OrderController.getMyOrders);

router.post('/', authUser.isLoggedIn, OrderController.saveOrder);


router.get('/:orderId', authUser.isLoggedIn, OrderController.getSelectiveOrder);

router.put('/:orderId', authUser.isLoggedIn, OrderController.updateMyOrder);

router.delete('/:orderId', authUser.isLoggedIn, authUser.isAdmin, OrderController.deleteOrder);

router.put('/cancelOrder/:orderId', authUser.isLoggedIn, OrderController.cancelMyOrder);



router.get('/userOrders/:userId', authUser.isLoggedIn, authUser.isAdmin, OrderController.getUserOrders);

router.get('/select/allOrders', authUser.isLoggedIn, authUser.isAdmin, OrderController.getAllOrders)

router.put('/anyuser/:orderId', authUser.isLoggedIn,  authUser.isAdmin, OrderController.updateOrder);




module.exports = router;