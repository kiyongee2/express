const bcrypt = require('bcrypt');

const originalPW = '1234';  //원본 비번
const saltRounds = 10; //솔트 라운드 수 정의

// 비밀번호 해싱 함수
function hashPW(password){
  return bcrypt.hashSync(password, saltRounds);
}

// 원본 비밀번호와 해시된 비밀번호가 일치하는지 확인하는 함수
function comparePW(password, hashedPW){
  return bcrypt.compareSync(password, hashedPW);
}

//원본 비번을 해싱한 결과
const hashedPW = hashPW(originalPW);
console.log(`Hashed PW: ${hashedPW}`);

// 원본 비번과 해시된 비번이 일치하는 지 확인
const isMatch = comparePW(originalPW, hashedPW);
console.log(`originalPW === hashedPW: ${isMatch}`);