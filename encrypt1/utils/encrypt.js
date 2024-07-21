const bcrypt = require('bcrypt');

const saltRounds = 11; //솔트 라운드 수 정의

// 비밀번호 해싱 함수
const bcryptPassword = (password) => bcrypt.hash(password, saltRounds);

const comparePassword = (password, dbPassword) => bcrypt.compare(password, dbPassword)

module.exports = {
  bcryptPassword,
  comparePassword
}