import { Module } from '@nestjs/common';
import { ControllerModule } from './controller/controller.module';
import { DatabaseModule } from './database/database.module';
import { MessageBrokerModule } from './message-broker/message-broker.module';

@Module({
  imports: [MessageBrokerModule, DatabaseModule, ControllerModule],
  exports: [DatabaseModule, MessageBrokerModule],
})
export class InfraModule {}
