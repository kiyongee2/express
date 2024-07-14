const mysql = require('mysql2')

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'myuser',
  password: 'pw1234',
  database: 'kdt'
})