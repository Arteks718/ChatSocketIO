const http = require('http');
//1
const { Server } = require('socket.io')
const HOST = '127.0.0.1' || process.env.HOST
const PORT = 5000 || process.env.PORT

const httpServer = http.createServer(() => {})
//2
const io = new Server(httpServer, {
  cors: {
    origin: "http://127.0.0.1:5000"
  }
})

io.on('connection', socket => {
  io.emit('GLOBAL_EVENT', 'Hello from server')
})

httpServer.listen(PORT, HOST, () => {
  console.log(`Server is listening on ${HOST}:${PORT}`)
})