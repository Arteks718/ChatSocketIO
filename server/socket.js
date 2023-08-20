const { Server } = require('socket.io') 
const { Message } = require('./models')

const socketInit = (httpServer) => {
  const io = new Server(httpServer, {
    cors: { origin: 'http://localhost:3000'},
  })
  io.on('connection', socket => {
    console.log('socket is connected')
    socket.on('NEW_MESSAGE', async payload => {
      console.log('payload', payload)
      try {
        const createdMessage = await Message.create(payload)
        io.emit('NEW_MESSAGE_CREATED', createdMessage.toObject())
      } catch (error) {
        
      }
    })
  })
}

module.exports = socketInit