
const roomList = []

exports.connection = (io, socket) => {
  console.log('접속 : ', socket.id);
  //채팅방 목록 보내기
  socket.emit('roomList', roomList);

  // 채팅방 만들기
  socket.on('create', (roomName, userName, cb) => {
    //join(방이름) - 해당 방이름이 없다면 생성, 존재하면 입장
    //socket.rooms에 socket.id값과 방이름 확인 가능
    socket.join(roomName);

    socket.room = roomName;
    socket.user = userName;

    socket.to(roomName).emit('notice', `${socket.id}님이 입장하셨습니다.`);

    //채팅방 목록 갱신
    if(!roomList.includes(roomName)){
      roomList.push(roomName);
      //갱신된 목록은 전체가 봐야함
      io.emit('roomList', roomList);
    }
    const usersInRoom = getUsersInRoom(roomName);  //함수 호출
    io.to(roomName).emit('userList', usersInRoom);
    cb();
  })

  // 메시지 보내기
  socket.on('sendMessage', (message) => {
    console.log(message);
    if(message.user === 'all'){
      io.to(socket.room).emit('newMessage', message.message, message.nick, false);
    }else{
      io.to(message.user).emit('newMessage', message.message, message.nick, true);
      //자기 자신에게 메시지 띄우기
      socket.emit('newMessage', message.message, message.nick, true)
    }
  })

  // 연결 종료
  socket.on('disconnect', () => {
    if(socket.room){
      socket.leave(socket.room);
    }
  });

  function getUsersInRoom(room){
    const users = [];
    // 채팅룸에 접속한 socket.id 값을 찾아야 함.
    const clients = io.sockets.adapter.rooms.get(room);
    console.log(clients);

    if(clients){
      clients.forEach((socketId) => {
        const userSocket = io.sockets.sockets.get(socketId);
        // 개별 사용자에게 메시지를 보내기 이해 객체 형태로 변경
        const info = { name: userSocket.user, key: socketId };
        users.push(info);
      });
    }
    return users;
  }
}