const express = require("express");
const router = express.Router();
const IngredientController = require("../controllers/ingredients");
const authUser = require("../helpers/authentication");
const validation = require("../helpers/validation");
const Ingredient  = require('../models/ingredients');

router.get('/',authUser.isLoggedIn, authUser.isAdmin, IngredientController.getNewIngredient);

router.post('/', authUser.isLoggedIn, authUser.isAdmin, validation.validateUser(validation.schemas.ingredientSchema), IngredientController.saveIngredient);

router.get('/:id',authUser.isLoggedIn, authUser.isAdmin, IngredientController.getSelectiveIngredient);

router.put('/:id',authUser.isLoggedIn, authUser.isAdmin, validation.validateUser(validation.schemas.ingredientSchema), IngredientController.updateIngredient);

router.delete('/:id',authUser.isLoggedIn, authUser.isAdmin, IngredientController.deleteIngredient);

router.get('/select/allIngredients',authUser.isLoggedIn, authUser.isAdmin, IngredientController.getAllIngredients);

router.get('/threshold/less',authUser.isLoggedIn, authUser.isAdmin, IngredientController.getthresholdLessIngredient);

router.get('/vendor/:name',authUser.isLoggedIn, authUser.isAdmin, IngredientController.sameVendor);



module.exports = router;