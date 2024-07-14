const mysql = require('mysql2')

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'myuser',
  password: 'pw1234',
  database: 'kdt'
});

exports.getVisitors = (cb) => {
  let sql = `select * from visitor`;
  conn.query(sql, (err, rows) => {
    if (err) throw err;

    console.log('Visitor.js > ', rows);
    cb(rows);  //컨트롤러로 결과값을 넘겨줌
  })
}

exports.postVisitor = (data, cb) => {
  // data: req.body
  // cb: 콜백 함수
  console.log('postVisitor >', data);

  let sql = 'insert into visitor(name, comment) values (?, ?)';
  let values = [data.name, data.comment]
  conn.query(sql, values, (err, rows) => {
    if (err) throw err;
    console.log('Visitor.js >', rows);

    cb(rows.insertId); //콜백함수 호출, 매개변수로 3이라는 값
  })
}

// 한 건 가져오기
exports.getVisitor = (id, cb) => {
  let sql = 'select * from visitor where id = ?';
  conn.query(sql, [id], (err, rows) => {
    if (err) throw err;
    console.log('getVisitor Visitor.js > ', rows);
    //[ { id: 1, name: '이순신', comment: '남은 배는 12척'} ]
    cb(rows[0]);
  });
}