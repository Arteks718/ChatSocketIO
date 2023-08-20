import {io} from 'socket.io-client'

const socket = io('ws://localhost:5000')

export const createMessageWs = payload => 
  socket.emit('NEW_MESSAGE', payload)

socket.on('NEW_MESSAGE_CREATED', payload => {
  console.log('payload :>>' , payload)
})

export default socket;