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

// 회원정보 수정 페이지 요청
exports.post_profile = (userid, cb) => {
  let sql = 'select * from user where userid = ?';
  conn.query(sql, [userid], (err, rows) => {
    if (err) throw err;
    console.log('User.js post_profile > ', rows);
    cb(rows);
  })
}

// 회원 정보 수정 요청
exports.edit_profile = (data, cb) => {
  let sql = 'update user set pw = ?, name = ? where id = ?';
  let values = [data.pw, data.name, data.id];

  conn.query(sql, values, (err, rows) => {
    if (err) throw err;

    console.log('User.js edit_profile >', rows);
    cb(rows);
  })
}

// 회원 탈퇴
exports.delete_profile = (id, cb) => {
  let sql = "delete from user where id = ?";
  conn.query(sql, [id], (err, rows) => {
    if (err) throw err;
    console.log('User.js delete_profile >', rows);
    cb(rows);
  })
}