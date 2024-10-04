import { Module } from '@nestjs/common';
import { PublishModule } from './amqp/publish/publish.module';
import { SubscribeModule } from './amqp/subscribe/subscribe.module';

@Module({
  imports: [SubscribeModule, PublishModule],
})
export class MessageBrokerModule {}
