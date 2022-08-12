import express from 'express'
import { Server as SocketServer } from 'socket.io'
import { Server as HttpServer, createServer } from 'http';

import Listeners from './websocket/listeners';

class WsServer {

  public express: express.Application
  public httpServer: HttpServer;
  public io: SocketServer;

  public constructor () {
    this.express = express()
    this.httpServer  = createServer(this.express)
    this.io = new SocketServer(this.httpServer, {
      path: '/',
      cors: {
        origin: '*',
      }
    })
    this.loadListeners()
  }  

  loadListeners () {
    new Listeners(this.io)
  }
}

export default new WsServer()