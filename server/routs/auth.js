const express = require('express');
const router = express.Router();
const passport = require("passport");

router.get('/login', function (req, res) {
  res.render('login', { title: 'Login' })
})

router.post('/login', function (req, res) {
  console.log(req.body)

  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/');
    });
  })(req, res, next);
})

module.exports = router;