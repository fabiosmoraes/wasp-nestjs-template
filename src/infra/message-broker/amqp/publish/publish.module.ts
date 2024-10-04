import { Module } from '@nestjs/common';

import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { RabbitMQConfig } from '../config/rabbitmq.config';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      useClass: RabbitMQConfig,
    }),
  ],
  providers: [],
  exports: [],
})
export class PublishModule {}
