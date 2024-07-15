const mysql = require('mysql2')

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'myuser',
  password: 'pw1234',
  database: 'kdt'
})

//회원 가입 요청
exports.post_signup = (data, cb) => {
  let sql = 'insert into user (userid, pw, name) values (?, ?, ?)';
  let values = [data.userid, data.pw, data.name];

  conn.query(sql, values, (err, rows) => {
    if (err) throw err;
    console.log('User.js post_signup >', rows);
    cb(rows);
  })
}

//로그인 요청
exports.post_signin = (data, cb) => {
  let sql = 'select * from user where userid = ? and pw = ?';
  let values = [data.userid, data.pw];

  conn.query(sql, values, (err, rows) => {
    if (err) throw err;
    console.log('User.js post_signin > ', rows);
    cb(rows);
  })
}