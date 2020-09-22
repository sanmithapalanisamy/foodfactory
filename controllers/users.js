const User = require('../models/users');
const bcrypt = require('bcrypt');

module.exports = {
  login: async (req, res, next) => {
    var userData = User.find({});
    res.status(200).json({
      msg: 'login -requested page - success'
    })
  },

  logout: async (req, res, next) => {
    req.session.destroy((err) => {
      if (err) {
        console.log("-----logout error---------");
        console.log(err);
        res.status(500);
        res.json({
          message: 'Logout error'
        });
        return;
      }
      res.clearCookie('connect.sid');
      req.logout();
      res.status(200);
      res.json({
        message: 'Logout Success'
      });
    });
  },

  updatePasswordForm : (req, res, next) => {
    res.json({
      message : 'Updatepassword form page - requested'
    })
  },

  updatePassword: async (req, res, next) => {
    try {
      var user = await User.findOne({ email: req.body.email});
      var isValidPassword = function (formPwd, dbpwd) {
        return bcrypt.compareSync(formPwd, dbpwd);
      }
      if (user && isValidPassword(req.body.oldPassword,user.password) && req.body.password === req.body.confirmPassword) {
        var newpassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
        await User.updateOne({ email: req.body.email }, { password: newpassword, updatedAt : Date.now()})
        res.json({
          message: 'Update password success'
        })
      }
      else {
        res.status(400);
        res.json({
          message: 'Cannot Update Password'
        })
      }
    }
    catch (err) {
      console.log("----error in reset password-----");
      console.log(err);
      res.satus(400);
      res.json({
        message: 'Error in reset password'
      })
    }
  },

  signup: (req, res, next) => {
    res.status(200).json({
      message: 'signup - requested page - success'
    })
  },

  updateUser: async(req, res, next) => {
    try {
      var user = await User.findOne({ _id: req.session.passport.user.id });
      if (user) {
        await User.updateOne({email: req.session.passport.user.email},{ name: req.body.name, updatedAt : Date.now() })
        res.json({
          message: 'update name success'
        })
      }
      else {
        res.satus(400);
        res.json({
          message: 'Cannot Update name'
        })
      }
    }
    catch (err) {
      console.log("----error in reset name-----");
      console.log(err);
      res.satus(500);
      res.json({
        message: 'Error in reset name'
      })
    }
  },

  updateUserForm: async(req, res, next) => {
    res.json({
      message : 'UpdateUser form page quested - succces'
    })
  },

  listAllUsers : async(req, res, next) => {
    try {
      var user = await User.find({});
      res.json({
        message : 'List of all users ( role : admin & basic )',
        data : user
      })
    }
    catch (err) {
      console.log("----error in get list of all users-----");
      console.log(err);
      res.status(500);
      res.json({
        message: 'Cannot get list of all users'
      })
    }
  },

  deactivateUser : async(req, res, next) => {
    try {
      var user = await User.findOne({ _id: req.params.userId});
      console.log(user);
      console.log("user data");
      if (user) {
        await User.updateOne({ _id: req.params.userId},{ status : false })
        res.json({
          message: 'User deactivated'
        })
      }
      else {
        res.status(400);
        res.json({
          message: 'User does not exists on selected id'
        })
      }
    }
    catch (err) {
      console.log("----error in deactivate user by admin-----");
      console.log(err);
      res.status(500);
      res.json({
        message: 'Error in deactivating user'
      })
    }
  }
}