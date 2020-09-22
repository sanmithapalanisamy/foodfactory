const passport = require("passport");
const LocalStrategy  = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/users');

module.exports = function(){

  passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
    function (req, email, password, done) {
      var isValidPassword = function (userpass, password) {
        return bcrypt.compareSync(password, userpass);
      }
      User.findOne({
          email: email,
          status: true
      }).then(function (user) {
        if (!user) {
          console.log("user does not exist");
          return done(null, false, {
            message: 'User does not exist'
          });
        }
        if (!isValidPassword(user.password, password)) {
          console.log("Incorrect password"); 
          return done(null, false, {
            message: 'Incorrect password.'
          });
        }
        return done(null, user);
      }).catch(function (err) {
        console.log("Error:", err);
        return done(null, false, {
          message: 'Something went wrong with your Signin'
        });
      });
    }
  ));

  passport.serializeUser(function (user, done) {
    if (user) {
      return done(null, { id: user._id, name: user.name, email: user.email, status: user.status, role: user.role });
    }
  });

  passport.deserializeUser(function (user, done) {
    User.findOne( { email: user.email }, (err,user)=>{
      if (err) {
        console.log("Error loading user: " + err);
        return;
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });


  // passport.use(
  //   new LocalStrategy({ usernameField: 'email'},(email,password,done)=>{
  //     User.findOne({email:email})
  //       .then(user => {
  //         if(!user){
  //           return done(null, false, {message: 'Email is not registered'})
  //         }
  //         else{
  //           bcrypt.compare(password, user.password), (err,isMatch)=>{
  //             if(err) throw err;
  //             if(isMatch){
  //               return done(null,user)
  //             }
  //             else{
  //               return done(null,false,{message : 'Password does not match'})
  //             }
  //           };
  //         }
  //       })
  //       .ctach(err => console.log(err));
  //   })
  // )
}