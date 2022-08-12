import { Server } from 'socket.io'

import KafkaConnection from '../../infrastructure/kafka'


export default class deliveryListeners {
  
  constructor (private io: Server) {
    new KafkaConnection()
  }

  on() {
    this.io.on("connection", (socket) => {
      consume(({ from, to, message }) => {
        io.sockets.emit('newMessage', { from, to, message });
      })
    });
  }

}