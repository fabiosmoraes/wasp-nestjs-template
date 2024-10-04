import * as amqp from 'amqplib';

export class RabbitMQProvider {
  private connection: amqp.Connection;
  private channel: amqp.Channel;

  async initialize() {
    this.connection = await amqp.connect(process.env.AMQP_RABBIT);
    this.channel = await this.connection.createChannel();
  }

  async publish(
    exchange: string,
    routingKey: string,
    payload: any,
    timeoutInSeconds: number = 1,
  ) {
    await this.channel.publish(
      exchange,
      routingKey,
      Buffer.from(JSON.stringify(payload)),
    );
    await new Promise((resolve) =>
      setTimeout(resolve, timeoutInSeconds * 1000),
    );
  }

  async createQueue(
    exchange: string,
    routingKey: string,
    durable: boolean = true,
    exchangeType: string = 'topic',
  ): Promise<string> {
    const queue = `test.e2e-${routingKey}`;

    Promise.all([
      await this.channel.assertExchange(exchange, exchangeType, { durable }),
      await this.channel.assertQueue(queue, { durable }),
      await this.channel.bindQueue(queue, exchange, routingKey),
    ]);

    return queue;
  }

  async deleteQueue(queue: string) {
    await this.channel.deleteQueue(queue);
  }

  async consumeMessage<T>(
    queue: string,
    deleteQueue: boolean = true,
    timeoutInSeconds: number = 1,
    noAck: boolean = true,
  ): Promise<T> {
    const message = await Promise.race<T | null>([
      new Promise((resolve, reject) => {
        this.channel.consume(
          queue,
          (message: amqp.ConsumeMessage) => {
            try {
              resolve(JSON.parse(message.content?.toString('utf8')));
            } catch (error) {
              reject(error);
            }
          },
          { noAck },
        );
      }),
      new Promise((resolve, _) => {
        setTimeout(() => {
          resolve(null);
        }, timeoutInSeconds * 1000);
      }),
    ]);

    if (deleteQueue) await this.deleteQueue(queue);

    return message;
  }

  async messageCount(queue: string) {
    const checkQueue = await this.channel.checkQueue(queue);
    return checkQueue.messageCount;
  }

  async close(): Promise<void> {
    if (this.channel) {
      await this.channel.close();
    }
    if (this.connection) {
      await this.connection.close();
    }
  }
}
