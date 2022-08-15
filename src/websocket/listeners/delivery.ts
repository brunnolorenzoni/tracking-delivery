import { Kafka } from 'kafkajs'
import { Server } from 'socket.io'
import { Service } from '../../interfaces/Service'

import DeliveryPostion from '../services/DeliveryPostion'
import KafkaConnection from '../../infrastructure/kafka'


export default class deliveryListeners {

  kafka: Kafka

  deliveryPostion: Service
  
  constructor (readonly io: Server) {
    
    this.kafka = new KafkaConnection({
      clientId: 'my-app',
      brokers: ['localhost:9092']
    }).kafka

    this.deliveryPostion = new DeliveryPostion(this.kafka)

    this.registerListeners()

  }

  registerListeners() {
    this.io.on("connection", this.deliveryPostion.execute);
  }

}