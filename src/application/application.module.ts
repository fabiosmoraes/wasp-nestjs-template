import { HelloWorldUseCase } from '@/domain/use-case/hello-world/hello-world.use-case';
import { PublishModule } from '@/infra/message-broker/amqp/publish/publish.module';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../infra/database/database.module';
import { HelloWorld } from './use-case/hello-wolrd/hello-world';

@Module({
  imports: [DatabaseModule, PublishModule],
  providers: [{ provide: HelloWorldUseCase, useClass: HelloWorld }],
  exports: [HelloWorldUseCase],
})
export class ApplicationModule {}
