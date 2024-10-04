import { HelloWorldUseCase } from '@/domain/use-case/hello-world/hello-world.use-case';
import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { HelloWorldResponse } from './hello-world.response';

@ApiTags('Hello World')
@Controller('hello-world')
export class HelloWorldController {
  constructor(private readonly helloWorldUseCase: HelloWorldUseCase) {}

  @ApiResponse({
    status: HttpStatus.OK,
    type: HelloWorldResponse,
  })
  @Get()
  async getHelloWorldMessage(): Promise<HelloWorldResponse> {
    return this.helloWorldUseCase.execute();
  }
}
