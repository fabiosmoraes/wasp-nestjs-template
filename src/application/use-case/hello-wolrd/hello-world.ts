import { HelloWorldRepository } from '@/domain/repository/hello-world.repository';
import { HelloWorldOutput } from '@/domain/use-case/hello-world/hello-world.output';
import { HelloWorldUseCase } from '@/domain/use-case/hello-world/hello-world.use-case';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HelloWorld implements HelloWorldUseCase {
  constructor(private readonly helloWorldRepository: HelloWorldRepository) {}
  async execute(): Promise<HelloWorldOutput> {
    return await this.helloWorldRepository.getHelloWorldMessage();
  }
}
