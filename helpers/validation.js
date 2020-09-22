const Joi = require('joi');

module.exports = {
  validateUser : (schema) => {
    return (req, res, next) => {
      const result = schema.validate(req.body);
      console.log("----------------resutl-----------");
      console.log(result);
      if(result.error){
        return res.status(400).json(result.error);
      }
      else{
        console.log(req.value);

        if(!req.value){
          req.value = {};
        }
        if(!req.value['body']){
          req.value['body'] = {};
        }

        req.value['body'] = result.value;
        next();
      }
    }
  },


  schemas: {
    userSchema: Joi.object().keys({
      name: Joi.string().max(15).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(3).max(15).required(),
      role : Joi.string().valid('admin','user').required(),
    }),

    foodSchema: Joi.object().keys({
      name: Joi.string().max(20).required(),
      cuisine: Joi.string().required(),
      ingredients: Joi.array().required(),
      costOfProduction : Joi.number().required(),
      sellingCost : Joi.number().required(),
    }),

    ingredientSchema: Joi.object().keys({
      name: Joi.string().max(20).required(),
      availableQuantity: Joi.number().required(),
      thresholdQuantity: Joi.number().required(),
      unit : Joi.string(),
      price : Joi.number().required(),
      vendorName : Joi.string().max(20).required(),
      vendorEmail : Joi.string().email().required()
    }),
}
}