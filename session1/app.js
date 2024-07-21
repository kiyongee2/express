const express = require('express')
const session = require('express-session')
const app = express()
const PORT = 8000;

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.json()) //db로 보내줌

// 세션 미들웨어 등록
app.use(session({
  secret: 'codingOnKey',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 60 * 1000,
  }
}))

// user 정보
const userInfo = { id:'banana', pw:'1234' }

app.get('/', (req, res) => {
  const user = req.session.user;
  console.log('req.session.user >', user);
  if(user !== undefined){
    res.render('index', { isLogin: true, user: user});
  }else{
    res.render('index', { isLogin: false});
  }
})

// 로그인 페이지 요청
app.get('/login', (req, res) => {
  res.render('login');
})

// 로그인 처리 요청
app.post('/login', (req, res) => {
  const { id, pw } = req.body;
  if(id === userInfo.id && pw === userInfo.pw){
    req.session.user = id;  // 세션 발급(id)
    res.redirect('/');
  }else{
    res.send('로그인 실패!')
  }
})

// 로그 아웃 처리 요청
app.get('/logout', (req, res) => {
  const user = req.session.user;  
  console.log('req.session.user >', user);

  if(user !== undefined){
    req.session.destroy((err) => {
      res.redirect('/');
    })
  }else{
    res.send("잘못된 접근입니다.")
  }
})

app.listen(PORT, () => {
  console.log('http://localhost:${PORT}');
})