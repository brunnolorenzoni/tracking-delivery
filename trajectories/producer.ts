import Kafka from '../src/infrastructure/kafka/'
import Producer from '../src/infrastructure/kafka/Producer'

(async () => {
  const { kafka } = new Kafka({ clientId: 'my-app-producer', brokers: ['localhost:9092'] })
  const producer = new Producer(kafka)

  await producer.sendMessage('topic', { 
    key: 'user_id_1234', 
    value: JSON.stringify({ lat: -78.456553464, lng: 47.000484357 }), 
  })

  await producer.shutdown()
  
  process.exit(0)
})();
