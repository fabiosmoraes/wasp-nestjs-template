import { ConfigModule } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';

ConfigModule.forRoot({
  envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

export const dataSourceOptions: DataSourceOptions = {
  type: process.env.TYPEORM_CONNECTION as any,
  host: process.env.TYPEORM_HOST,
  port: parseInt(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: [process.env.TYPEORM_ENTITIES],
  migrations: [process.env.TYPEORM_MIGRATIONS],
  synchronize: false,
};
