import { Kafka } from 'kafkajs'
import { Server } from 'socket.io'

import DeliveryPostion from '../services/DeliveryPostion'
import KafkaConnection from '../../infrastructure/kafka'


export default class deliveryListeners {

  kafka: Kafka

  deliveryPostion: DeliveryPostion
  
  constructor (readonly io: Server) {
    
    this.kafka = new KafkaConnection({
      clientId: 'my-app-consumer',
      brokers: ['localhost:9092']
    }).kafka

    this.deliveryPostion = new DeliveryPostion(this.kafka)

    this.registerListeners()

  }

  registerListeners() {
    this.io.on("connection", this.deliveryPostion.execute);
  }

}