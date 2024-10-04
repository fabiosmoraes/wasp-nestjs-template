import { GetHelloWorldMessageOutput } from '@/domain/repository/hello-world-repository.output';
import { HelloWorldRepository } from '@/domain/repository/hello-world.repository';

export class HelloWorldImplRepository implements HelloWorldRepository {
  async getHelloWorldMessage(): Promise<GetHelloWorldMessageOutput> {
    return {
      message: 'Hello, World!',
    };
  }
}
