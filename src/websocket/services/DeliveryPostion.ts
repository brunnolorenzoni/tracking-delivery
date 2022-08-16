import { Kafka } from 'kafkajs';
import { Socket } from 'socket.io'
import ConsumerProvider from '../../infrastructure/kafka/Consumer';

export default class DeliveryPostion {

  constructor(private kafka: Kafka) {
    this.execute = this.execute.bind(this);
  }
  
  async execute (socket: Socket) {
    console.log('connected:', socket.id)
    const userId = socket.handshake.query.userId
    console.log({ userId })
    if(!userId) return false
    
    socket.join(userId)
    new ConsumerProvider(this.kafka).startConsumer(['topic'], ({ message }) => {
      const { key, value, headers} = message
      const { lat, lng } = JSON.parse(value)
      socket.to(key).emit('position', {
        key,
        value: {
          lat: parseFloat(lat),
          lng: parseFloat(lng)
        },
        headers
      })
    })
  }

}