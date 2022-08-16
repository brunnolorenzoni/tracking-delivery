import { Kafka } from 'kafkajs';
import { Socket } from 'socket.io'
import ConsumerProvider from '../../infrastructure/kafka/Consumer';

export default class DeliveryPostion {

  constructor(private kafka: Kafka) {
    this.execute = this.execute.bind(this);
  }
  
  async execute (socket: Socket) {
    console.log('connected:', socket.id)
    new ConsumerProvider(this.kafka).startConsumer(['topic'], ({ message }) => {
      const { key, value, headers} = message
      socket.emit('position', {
        key,
        value: JSON.parse(value),
        headers
      })
    })
  }

}