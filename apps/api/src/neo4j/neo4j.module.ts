import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Neo4jService } from './neo4j.service';
import { Neo4jConfig } from './neo4j-config.interface';
import neo4j from 'neo4j-driver';
import { ConnectionError, createDatabaseConfig } from './neo4j.utils';
import { NEO4J_CONFIG, NEO4J_DRIVER } from './neo4j-constants';

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
          provide: NEO4J_DRIVER,
          inject: [NEO4J_CONFIG],
          useFactory: async (config: Neo4jConfig) => {
            try {
              const driver = neo4j.driver(
                `${config.scheme}://${config.host}:${config.port}`,
                neo4j.auth.basic(config.username, config.password),
              );
              await driver.getServerInfo();
              return driver;
            } catch (error) {
              const connectionError = new ConnectionError(error);
              console.error(connectionError.message);
              throw connectionError;
            }
          },
        },
      ],
      exports: [Neo4jService],
    };
  }
}
