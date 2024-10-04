import { Module } from '@nestjs/common';

import { ApplicationModule } from '@/application/application.module';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { RabbitMQConfig } from '../config/rabbitmq.config';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      useClass: RabbitMQConfig,
    }),
    ApplicationModule,
  ],
  providers: [],
})
export class SubscribeModule {}
