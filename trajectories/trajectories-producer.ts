import Kafka from '../src/infrastructure/kafka'
import Producer from '../src/infrastructure/kafka/Producer'
import { parse } from 'csv'
import fs from 'fs'

const { kafka } = new Kafka({ clientId: 'my-app-producer', brokers: ['localhost:9092'] })
const producer = new Producer(kafka)

fs.readdirSync('./trajectories/data/').forEach(file => {
  (async () => {
    const sleep = (ms:number) => new Promise((r) => setTimeout(r, ms));
    const parser = fs
    .createReadStream(`./trajectories/data/${file.split('.')[0]}.csv`)
    .pipe(parse({
      columns: ['lat', 'lng', 'userId', 'altitude', 'numberOfDays', 'date', 'time'],
      delimiter: ',',
      trim: true,
    }));
    for await (const record of parser) {
      const { lat, lng, userId } = record
      const message = { 
        key: `${userId}`, 
        value: JSON.stringify({ lat, lng })
      }
      await producer.sendMessage('topic',message)
      console.log('MENSAGEM ENVIADA', message)
      await producer.shutdown()
      await sleep(1000);
    }
  })()
});