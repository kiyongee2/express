//const User = require('../model/User')

exports.main = (req, res) => {
  res.render('index');
}

exports.get_signup = (req, res) => {
  res.render('signup');
}