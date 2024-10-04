// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ConfigModule } = require('@nestjs/config');
ConfigModule.forRoot({
  envFilePath: '.env.test',
});