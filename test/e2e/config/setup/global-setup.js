/* eslint-disable @typescript-eslint/no-var-requires */
const { DockerComposeEnvironment } = require('testcontainers');
const { DataSource } = require('typeorm');
const {
  dataSourceOptions,
} = require('../../../../src/infra/database/config/pg-data-source.config');

module.exports = async function () {
  console.log('\n####### GLOBAL SETUP FOR E2E TESTING #######\n');

  const composeFilePath = process.cwd();
  const composeFile = 'docker-compose.e2e.yml';

  console.log('DOCKER-COMPOSE UP STARTING');
  const container = await new DockerComposeEnvironment(
    composeFilePath,
    composeFile,
  ).up();
  globalThis.__CONTAINER__ = container;
  console.log('DOCKER-COMPOSE UP FINISHED\n');

  const dataSource = new DataSource(dataSourceOptions);
  try {
    console.log('DATABASE MIGRATING STARTING');
    await dataSource.initialize();
    await dataSource.runMigrations();
    await dataSource.destroy();
    console.log('DATABASE MIGRATED SUCCESSFULLY\n');
  } catch (error) {
    console.log('DATABASE ERROR: ', error);
  }
};
