import { ConfigService } from '@nestjs/config';
import { Neo4jConfig } from './neo4j-config.interface';

export const createDatabaseConfig = (
  configService: ConfigService,
  customConfig?: Neo4jConfig,
): Neo4jConfig => {
  return (
    customConfig || {
      scheme: configService.get('DATABASE_SCHEME')!,
      host: configService.get('DATABASE_HOST')!,
      port: configService.get('DATABASE_PORT')!,
      username: configService.get('DATABASE_USERNAME')!,
      password: configService.get('DATABASE_PASSWORD')!,
    }
  );
};

export class ConnectionError extends Error {
  constructor(nativeError: Error) {
    super();
    this.message = `Failed to establish connection with Neo4j database; error : "${nativeError.message}"`;
    this.name = 'Connection Error';
    this.stack = nativeError.stack;
  }
}
