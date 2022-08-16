import Kafka from '../src/infrastructure/kafka'
import Producer from '../src/infrastructure/kafka/Producer'
import { parse } from 'csv'
import fs from 'fs'



const { kafka } = new Kafka({ clientId: 'my-app-producer', brokers: ['localhost:9092'] })
const producer = new Producer(kafka)

const ids:Array<string> = []
fs.readdirSync('./trajectories/data/').forEach(file => {
  ids.push(file.split('.')[0]);
});


(async () => {

  const sleep = (ms:number) => new Promise((r) => setTimeout(r, ms));

  for await (const id of ids) {
    const parser = fs
    .createReadStream(`./trajectories/data/${id}.csv`)
    .pipe(parse({
      columns: ['lat', 'lng', 'field', 'altitude', 'numberOfDays', 'date', 'time'],
      delimiter: ',',
      trim: true,
    }));
    for await (const record of parser) {
      const { lat, lng } = record
      const message = { 
        key: `${id}`, 
        value: JSON.stringify({ lat, lng })
      }
      await producer.sendMessage('topic',message)
      console.log('MENSAGEM ENVIADA', message)
      await producer.shutdown()
      await sleep(2000);
    }
  }
  process.exit(0)
})()