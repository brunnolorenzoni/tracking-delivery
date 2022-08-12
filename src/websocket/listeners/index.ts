import { Server } from 'socket.io'

import deliveryListeners from './delivery'

export default class WSListeners {
  constructor (io: Server) {
    new deliveryListeners(io)
  }
}
