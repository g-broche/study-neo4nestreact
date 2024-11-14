import { Inject, Injectable, OnApplicationShutdown } from '@nestjs/common';
import { Driver } from 'neo4j-driver';
import { NEO4J_DRIVER } from './neo4j-constants';

@Injectable()
export class Neo4jService implements OnApplicationShutdown {
  constructor(
    @Inject(NEO4J_DRIVER)
    private readonly driver: Driver,
  ) {}

  getDriver() {
    return this.driver;
  }

  onApplicationShutdown() {
    const session = this.driver.session({ database: 'neo4j' });
    session.close();
    this.driver.close();
  }
}
