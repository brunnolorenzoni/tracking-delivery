import { Kafka, KafkaConfig, logLevel } from "kafkajs";
export default class KafkaConnect {

  kafka: Kafka;

  constructor(kafkaConfig: KafkaConfig) {
    if (!kafkaConfig.logLevel) kafkaConfig.logLevel = logLevel.NOTHING
    this.kafka = new Kafka(kafkaConfig);
  }
}
