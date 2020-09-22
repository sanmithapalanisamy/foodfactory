
  function isLoggedIn(req, res, next) {
    if (req.session.passport)
      return next();
    res.status(401);
    res.json({
      message : 'User not loggedIn'
    })
  }

  function AlreadyLoggedIn(req, res, next) {
    if (req.session.passport)
      res.json({
        message : 'User aleardy loggedIn'
      })
    return next();
  }

  function isAdmin(req, res, next) {
    if (req.session.passport.user.role == 'admin') {
      return next();
    } else {
      res.status(401);
      res.json({
        message : 'Dont have admin access'
      })
      return;
    }
  }
  
  module.exports = {
    isLoggedIn,
    AlreadyLoggedIn,
    isAdmin
}