const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

const app = express()
const PORT = 8000

// http 서버 생성
const server = http.createServer(app);
// socket.io를 서버에 연결
const io = socketIO(server);
// 사용자 아이디 모음 객체
const userObjs = {}

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('chat');
})

// io.on(): socket 관련 통신 작업 처리
io.on('connection', (socket) => {
  // connection 이벤트는 클라이언트가 접속했을때 발생
  // 콜백 함수의 인자로 소켓 객체를 제공

  // 소켓 고유 아이디(브라우저 탭 단위)
  console.log('서버 연결 완료 >', socket.id);

  // 실습 1
  socket.on('hello', (data) => {
    console.log(`${data.who} : ${data.msg}`);
    socket.emit('helloKR', { who: '제리', msg: '안녕!' })
  });

  // 실습 2
  io.emit('notice', `${socket.id} 님이 입장하셨습니다.`)

  // 실습 4. 채팅창 메시지 전송
  socket.on('send', (data) => {
    console.log('send 이벤트로 받은 data >', data);

    if(data.dm === 'all'){
      io.emit('newMessage', { id:data.id, msg: data.msg })
    }else{
      const dmSocketId = data.dm;
      const sendData = {
        id: data.id,
        msg: data.msg,
        dm: '(DM) '
      }

      //dm을 받는 사람에게 메시지 감
      io.to(dmSocketId).emit('newMessage', sendData);
      socket.emit('newMessage', sendData);
    }
  });

  // 실습 5. DM Step1
  socket.on('setUserList', (data) => {
    console.log('유저 입장 : ', data.id);
    // 입장 전체 공지
    io.emit('notice', `${data.id}님이 입장하셨습니다.`);

    userObjs[data.id] = data.id;
    socket.emit('entrySuccess', socket.id);  //현재 입장한 사람에게 입장 완료
    io.emit('updateUsers', userObjs);  //전체 사용자에게 사용자 업데이트
  })
})

server.listen(PORT, (req, res) => {
  console.log(`http://localhost:${PORT}`);
})


