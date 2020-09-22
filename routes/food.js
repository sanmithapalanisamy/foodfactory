const express = require("express");
const router = express.Router();
const FoodController = require("../controllers/food");
const authUser = require("../helpers/authentication");
const validation = require("../helpers/validation");
const Food  = require('../models/food');

router.get('/', authUser.isLoggedIn, authUser.isAdmin,  FoodController.getFoodForm);

router.post('/', authUser.isLoggedIn, authUser.isAdmin, validation.validateUser(validation.schemas.foodSchema), FoodController.saveFood);

router.get('/:id', authUser.isLoggedIn, FoodController.getSelectiveFood);

router.put('/:id',authUser.isLoggedIn, authUser.isAdmin,validation.validateUser(validation.schemas.foodSchema), FoodController.updateFood);

router.delete('/:id',authUser.isLoggedIn, authUser.isAdmin, FoodController.deleteFood);

router.get('/select/allFood', authUser.isLoggedIn, FoodController.getAllFood);

router.get('/select/highCostProd', authUser.isLoggedIn, authUser.isAdmin, FoodController.gethighCostOfProduction);

module.exports = router;