const { User } = require('../models')
const { bcryptPassword, comparePassword } = require('../utils/encrypt')

// index 페이지 요청
exports.index = (req, res) => {
  res.render('index', { data: req.session.userInfo });
}

// signup 페이지 요청
exports.get_signup = (req, res) => {
  res.render('signup');
}

// 회원가입 처리 요청
exports.post_signup = async (req, res) => {
  console.log('post_signup >', req.body);
  const { userid, pw, name } = req.body;
  const hash = await bcryptPassword(pw);

  await User.create({userid, pw: hash, name});
  res.json({ result: true });
}

// signin 페이지 요청
exports.get_signin = (req, res) => {
  res.render('signin');
}

// 로그인 처리 요청
exports.post_signin = async (req, res) => {
  // console.log('post_signin >', req.body);
  // 아이디를 찾아서 사용자 존재 유무 체크
  const { userid, pw } = req.body;
  const user = await User.findOne({
    where: { userid }
  });

  // 입력된 비번 암호화하여 db의 비번과 비교
  if(user){
    const result = await comparePassword(pw, user.pw); //true or false
    if(result){
      req.session.userInfo = { name: user.name, id: user.id} //세션 생성
      res.json({ result: true, data: user })
    }else{
      res.json({ result: false, message: '비밀번호가 틀렸습니다.' })
    }
  }else{
    res.json({ result: false, message: '존재하는 사용자가 없습니다.' })
  }
}

/*
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
*/