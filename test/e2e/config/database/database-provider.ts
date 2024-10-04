import { dataSourceOptions } from '@/infra/database/config/pg-data-source.config';
import { DataSource } from 'typeorm';

export class DatabaseProvider extends DataSource {
  constructor() {
    super(dataSourceOptions);
  }

  async initialize() {
    return await super.initialize();
  }

  async close() {
    await this.destroy();
  }

  async clean() {
    const skipTables = [];

    for await (const entity of this.entityMetadatas) {
      if (skipTables.includes(entity.tableName)) {
        continue;
      }
      await this.query(
        `TRUNCATE "${entity.tableName}" RESTART IDENTITY CASCADE`,
      );
    }
  }
}
