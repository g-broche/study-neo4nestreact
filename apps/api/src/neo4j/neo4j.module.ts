import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Neo4jService } from './neo4j.service';
import { Neo4jConfig } from './neo4j-config.interface';
import neo4j from 'neo4j-driver';
import { ConnectionError, createDatabaseConfig } from './neo4j.utils';

export const NEO4J_CONFIG = 'NEO4J_CONFIG';
export const NEO4J_CONNECTION = 'NEO4J_CONNECTION';

@Module({
  providers: [Neo4jService],
})
export class Neo4jModule {
  static forRootAsync(customConfig?: Neo4jConfig): DynamicModule {
    return {
      module: Neo4jModule,
      imports: [ConfigModule],
      global: true,
      providers: [
        {
          provide: NEO4J_CONFIG,
          inject: [ConfigService],
          useFactory: (configService: ConfigService) =>
            createDatabaseConfig(configService, customConfig),
        },
        {
          provide: NEO4J_CONNECTION,
          inject: [NEO4J_CONFIG],
          useFactory: async (config: Neo4jConfig) => {
            try {
              const driver = neo4j.driver(
                `${config.scheme}://${config.host}:${config.port}`,
                neo4j.auth.basic(config.username, config.password),
              );
              await driver.getServerInfo();
              console.log('>> Neo4J connection established');
            } catch (error) {
              throw new ConnectionError(error);
            }
          },
        },
      ],
    };
  }
}
