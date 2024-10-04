import { ApplicationModule } from '@/application/application.module';
import { BankAuthModule } from '@bank/auth';
import { Module } from '@nestjs/common';
import { HelloWorldController } from './hello-world/hello-world.controller';

@Module({
  imports: [BankAuthModule, ApplicationModule],
  controllers: [HelloWorldController],
})
export class ControllerModule {}
