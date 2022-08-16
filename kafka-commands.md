## Create topic
```
docker exec -it kafka ./opt/bitnami/kafka/bin/kafka-topics.sh \
--create \
--bootstrap-server localhost:9092 \
--replication-factor 1 \
--partitions 3 \
--topic topic
```

## Check topic
```
docker exec -it kafka ./opt/bitnami/kafka/bin/kafka-topics.sh \
  --describe \
  --topic topic \
  --bootstrap-server localhost:9092
```

## List Topics
```
docker exec -it kafka ./opt/bitnami/kafka/bin/kafka-topics.sh --list --bootstrap-server localhost:9092
```

## Produce message
```
docker exec -it kafka ./opt/bitnami/kafka/bin/kafka-console-producer.sh \
  --broker-list localhost:9092 \
  --topic TOPIC_NAME 
```

## Consume message
```
docker exec -it kafka ./opt/bitnami/kafka/bin/kafka-console-consumer.sh \
  --bootstrap-server localhost:9092 \
  --from-beginning \
  --topic topic
```

## Delete topic
```
docker exec -it kafka ./opt/bitnami/kafka/bin/kafka-topics.sh --bootstrap-server localhost:9092 --delete --topic topic
```