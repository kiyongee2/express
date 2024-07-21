const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session')
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8888;
const db = require('./models')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.json()) //db로 보내줌
app.use(
  session({
    secret: "mySessionKey",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      maxAge: 60 * 1000
    }
  })
)

// user 라우팅
const userRouter = require('./routes/user');
app.use('/', userRouter);

app.get('*', (req, res) => {
  // res.send("404")
  res.render('404')
})

db.sequelize.sync({force: false}).then(() => {
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  })
})
