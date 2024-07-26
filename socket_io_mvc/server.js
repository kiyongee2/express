const http = require('http')
const express = require('express')
const SocketIO = require('socket.io')

const app = express();
const PORT = 8000;

const server = http.createServer(app);
const io = SocketIO(server);

app.set('view engine', 'ejs');

const indexRouter = require('./routes/index');
const socketRouter = require('./routes/socket');

app.use('/', indexRouter);

let flag = true;
app.get('/chat', (req, res) => {
  if(flag){
    flag = false;
    socketRouter.startSocket(io);
  }
  res.render('chat');
})

server.listen(PORT, (req, res) => {
  console.log(`http://localhost:${PORT}`);
})