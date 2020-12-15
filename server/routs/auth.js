const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require('jsonwebtoken');

router.post('/login',
  passport.authenticate('basic', { session: false }),
  function({ user }, res) {
    res.json({token: jwt.sign(user, 'your_jwt_secret')});
  });

module.exports = router;
