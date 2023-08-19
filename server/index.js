const http = require('http');
//1
const { Server } = require('socket.io')
const HOST = '127.0.0.1' || process.env.HOST
const PORT = 5000 || process.env.PORT

const httpServer = http.createServer(() => {})
//2
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000"
  }
})

// io.on('event', (payload) => {}) ~ btn.addEventListener('click', () => {})
//    - подписка на событие
// io.emit('event', payload) ~ dispatch(createUserThunk(newUser))
//    - генерация события - для всех клиентов
// socket.broadcast.emit('event', payload) -
//    - генерация события - для всех, кроме себя

io.on('connection', socket => {
  console.log('Connection established')
  io.emit('EVENT_FOR_ALL', 'Hello for everyone from server') // все видят
  socket.emit('EVENT_FOR_SELF', 'Hello, you connection is established') // только тот кто подклюился
  socket.broadcast.emit('EVENT_FOR_OTHER', 'New socket is connected') // все, кроме того что подключился

  socket.on('EVENT_FROM_SOCKET', (payload) => {
    console.log('payload :>>', payload)
    socket.broadcast.emit('SOME_EVENT_ON_SOME_SOCKET', 'Event on some socket')
  })
})

httpServer.listen(PORT, HOST, () => {
  console.log(`Server is listening on ${HOST}:${PORT}`)
})