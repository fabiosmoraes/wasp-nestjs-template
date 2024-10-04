import { GetHelloWorldMessageOutput } from './hello-world-repository.output';

export abstract class HelloWorldRepository {
  getHelloWorldMessage: () => Promise<GetHelloWorldMessageOutput>;
}
