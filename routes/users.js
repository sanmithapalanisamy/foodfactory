const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/users");
const authUser = require("../helpers/authentication");
const validation = require("../helpers/validation");
const bcrypt = require("bcrypt");
const User = require('../models/users');
const passport = require("passport");


router.get('/login', UsersController.login);

router.post('/login',  (req, res, next) => {

  passport.authenticate('local-signin',  (err, user, info) => {
    try {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).send({ success: false, message: 'authentication failed' });
      }
      req.login(user, async(err) => {
        if (err) {
          return next(err);
        }
        console.log('user',user,Date.now())
        await User.updateOne({ email: user.email }, { lastLoginAt: Date.now() })
        return res.status(200).send({ success: true, message: 'authentication succeeded' });
      });
    }
    catch (err) {
      res.status(500);
      res.json({
        message: 'Error in Login'
      })
    }
  })(req, res, next);
});

router.post('/logout', authUser.isLoggedIn, UsersController.logout);

router.get('/signup', UsersController.signup);

router.post('/signup', validation.validateUser(validation.schemas.userSchema), (req, res) => {
  User.findOne({ email: req.value.body.email })
    .then(user => {
      if (user) {
        res.json({
          message: 'Email Already Exists'
        })
      }
      else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          role: req.body.role,
          status: true,
          lastLoginAt: null
        });

        bcrypt.hash(newUser.password, 10, (err, hash) => {
          if (err) {
            console.log(err)
            res.json({
              message: 'Cannot register user, error in hasing!'
            })
            return;
          };
          newUser.password = hash;
          newUser.save()
            .then(user => {
              res.json({
                message: 'User registered !'
              })
            })
            .catch(err => {
              console.log(err);
              res.json({
                message: 'Cannot register user!'
              })
            })
        })
      }
    })
})

router.get('/updatePassword',authUser.isLoggedIn, UsersController.updatePasswordForm);

router.post('/updatePassword', authUser.isLoggedIn, UsersController.updatePassword);

// router.get('/updateUser', UsersController.updateUserForm);

router.put('/updateUser', authUser.isLoggedIn, UsersController.updateUser);

router.get('/listAllUsers', authUser.isLoggedIn, authUser.isAdmin, UsersController.listAllUsers);

router.put('/deactivateUser/:userId', authUser.isLoggedIn,authUser.isAdmin, UsersController.deactivateUser);



module.exports = router;