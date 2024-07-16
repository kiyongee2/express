const User = require('../model/User')

exports.main = (req, res) => {
  res.render('index');
}

// 회원 가입 페이지
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

//회원 정보 수정 페이지
exports.post_profile = (req, res) => {
  console.log(req.body);
  User.post_profile(req.body.userid, (result) => {
    if(result.length > 0) 
      res.render('profile', {data: result[0]})
  })
}

//회원 정보 수정 요청
exports.edit_profile = (req, res) => {
  console.log(req.body);
  User.edit_profile(req.body, (result) => {
    res.send("회원 정보 수정 성공!!")
  })
}

//회원 탈퇴
exports.delete_profile = (req, res) => {
  console.log(req.body);

  User.delete_profile(req.body.id, (result) => {
    res.send({ deletedId: req.body.id })
  })
}