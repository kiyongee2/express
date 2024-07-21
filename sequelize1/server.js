const express = require('express')
const app = express()
const PORT = 8000;
const db = require('./models/index')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.json()) //db로 보내줌

// index 라우팅
const indexRouter = require('./routes');
app.use('/', indexRouter);

// user 라우팅
const userRouter = require('./routes/user');
app.use('/user', userRouter);

app.get('*', (req, res) => {
  // res.send("404")
  res.render('404')
})

db.sequelize.sync({force: false}).then(() => {
  app.listen(PORT, () => {
    console.log('http://localhost:${PORT}');
  })
})
