import { RabbitMQConfig as GoLevelUpRabbitMQConfig } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RabbitMQConfig {
  constructor(private readonly configService: ConfigService) {}

  createModuleConfig(): GoLevelUpRabbitMQConfig {
    return {
      exchanges: [],
      uri: this.configService.get<string>('AMQP_RABBIT'),
    };
  }
}
