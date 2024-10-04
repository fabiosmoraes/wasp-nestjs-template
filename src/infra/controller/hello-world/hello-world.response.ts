import { ApiProperty } from '@nestjs/swagger';

export class HelloWorldResponse {
  @ApiProperty({
    example: 'Hello, World!',
    type: 'string',
    description: 'The message returned by the API',
  })
  message: string;
}
