import { Kafka, KafkaConfig } from "kafkajs";
export default class KafkaConnect {

  kafka: Kafka;

  constructor(kafkaConfig: KafkaConfig) {
    this.kafka = new Kafka(kafkaConfig);
  }
}
