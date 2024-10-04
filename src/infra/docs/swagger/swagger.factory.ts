import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// Adicionar no @bank/common
export enum NODE_ENV {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
}

export class SwaggerFactory {
  static create(app: INestApplication<any>): void {
    if (process.env.NODE_ENV === NODE_ENV.DEVELOPMENT) {
      const options = new DocumentBuilder()
        .setTitle(
          process.env.npm_package_name
            .replace(/\b\w/g, (char) => char.toUpperCase()) // criar função para isso na @bank/common
            .replace(/-/g, ' '),
        )
        .setDescription(process.env.npm_package_description)
        .setVersion(process.env.npm_package_version)
        .addBearerAuth()
        .build();

      const document = SwaggerModule.createDocument(app, options);
      SwaggerModule.setup('api', app, document);
    }
  }
}
