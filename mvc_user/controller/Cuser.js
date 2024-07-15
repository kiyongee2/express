const User = require('../model/User')

exports.main = (req, res) => {
  res.render('index');
}

exports.get_signup = (req, res) => {
  res.render('signup');
}

//회원가입 요청
exports.post_signup = (req, res) => {
  console.log('post_signup >', req.body);

  User.post_signup(req.body, (result) => {
    //result: rows
    res.send(result);
  })
}

//로그인 페이지
exports.get_signin = (req, res) => {
  res.render('signin');
}

//로그인 요청
exports.post_signin = (req, res) => {
  console.log(req.body);
  User.post_signin(req.body, (result) => {
    if(result.length > 0)
      res.send({isLogin: true, userInfo: result[0]})
    else
      res.send({isLogin: false})
  })
}