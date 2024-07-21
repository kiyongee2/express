
const models = require('../models/index')
const User = models.User;

// index 페이지 요청
exports.main = (req, res) => {
  res.render('index');
}

// signup 페이지 요청
exports.get_signup = (req, res) => {
  res.render('signup');
}

// 회원가입 처리 요청
exports.post_signup = (req, res) => {
  console.log('post_signup >', req.body);

  User.create({
    userid: req.body.userid,
    pw: req.body.pw,
    name: req.body.name
  }).then((result) => {
    console.log('create >', result);
    res.send(result);
  })
}

// signin 페이지 요청
exports.get_signin = (req, res) => {
  res.render('signin');
}

// 로그인 처리 요청
exports.post_signin = (req, res) => {
  console.log('post_signin >', req.body);

  User.findOne({
    raw: true,
    where: {
      userid: req.body.userid,
      pw: req.body.pw
    }
  }).then((result) => {
    console.log('findOne >', result);
    if(result){
      res.send({ isLogin: true, userInfo: result })
    }else{
      res.send({ isLogin: false })
    }
  })
}

// 회원 정보 수정 페이지 요청
exports.post_profile = (req, res) => {
  console.log(req.body);

  User.findOne({
    where: { userid: req.body.userid }
  }).then((result) => {
    console.log('findOne >', result);
    if(result){
      res.render('profile', {data: result})
    }
  })
}

// 회원 정보 수정 처리 요청
exports.edit_profile = (req, res) => {
  console.log(req.body);

  User.update(
    {
      pw: req.body.pw,
      name: req.body.name
    },
    {
      where: { id: req.body.id }
  }).then((result) => {
    res.send("회원 정보 수정 성공!!")
  })
}