import { Kafka, Consumer } from 'kafkajs';
import { Socket } from 'socket.io'

export default class DeliveryPostion {

  consumer: Consumer

  constructor(readonly kafka: Kafka) {
    this.consumer = this.kafka.consumer({ groupId: 'my-group' })
    this.execute = this.execute.bind(this);
    
    this.connectTopic()
  }
  async connectTopic() {
    await this.consumer.connect()
    await this.consumer.subscribe({ topics: ['topic'] })
  }
  
  async execute (socket: Socket) {
    console.log(socket.id);
    await this.consumer.run({
      eachMessage: async ({ message }) => {
        socket.emit('position', {
          key: message.key?.toString(),
          value: message.value?.toString(),
          headers: message.headers,
        })
      },
  })


  }

}