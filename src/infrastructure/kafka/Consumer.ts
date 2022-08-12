import { Consumer, ConsumerSubscribeTopics, Kafka, EachMessagePayload } from 'kafkajs'
import { MessageProcessor } from '../../interfaces/messageProcessor'

export default class ConsumerProvider {
  private kafkaConsumer: Consumer
  private messageProcessor: MessageProcessor

  public constructor(kafkaConnection: Kafka, messageProcessor: MessageProcessor) {
    this.messageProcessor = messageProcessor
    this.kafkaConsumer = this.createKafkaConsumer(kafkaConnection)
  }

  public async startConsumer(topics: string[]): Promise<void> {
    const topic: ConsumerSubscribeTopics = {
      topics: topics,
      fromBeginning: false
    }

    try {
      await this.kafkaConsumer.connect()
      await this.kafkaConsumer.subscribe(topic)

      await this.kafkaConsumer.run({
        eachMessage: async (messagePayload: EachMessagePayload) => {
          const { topic, partition, message } = messagePayload
          const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`
          this.messageProcessor(`- ${prefix} ${message.key}#${message.value}`)
        }
      })
    } catch (error) {
      console.log('Error: ', error)
    }
  }


  public async shutdown(): Promise<void> {
    await this.kafkaConsumer.disconnect()
  }

  private createKafkaConsumer(kafka: Kafka): Consumer {
    const consumer = kafka.consumer({ groupId: 'consumer-group' })
    return consumer
  }
}