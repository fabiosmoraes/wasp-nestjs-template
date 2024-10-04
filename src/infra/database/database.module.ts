import { HelloWorldRepository } from '@/domain/repository/hello-world.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './config/pg-data-source.config';
import { HelloWorldImplRepository } from './postgres/repository/hello-world.impl.repository';

const entities = [];

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forFeature(entities),
  ],
  providers: [
    { provide: HelloWorldRepository, useClass: HelloWorldImplRepository },
  ],
  exports: [HelloWorldRepository],
})
export class DatabaseModule {}
