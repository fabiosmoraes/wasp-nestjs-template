import { HelloWorldOutput } from './hello-world.output';

export abstract class HelloWorldUseCase {
  execute: () => Promise<HelloWorldOutput>;
}
