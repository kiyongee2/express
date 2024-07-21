const express = require('express');
const app = express();
const PORT = 8000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true}))
app.use(express.json())

//[라우터 분리]
const indexRouter = require('./routes');
app.use('/', indexRouter);

// [404 error]
app.get('*', (req, res) => {
  res.render('404');
})

app.listen(PORT, () => {
  console.log(`포트: ${PORT}에서 서버 실행중임...`);
})