import { Injectable } from '@nestjs/common';
import { Roles } from 'src/enum/roles';
import {
  QuerySingleEntityResponse,
  QueryStringResponse,
} from 'src/interface/queryResponse';
import { Neo4jService } from 'src/neo4j/neo4j.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import {
  convertUserToUserBasicDTO,
  convertUserToUserDetailedDTO,
} from 'src/utils/nodeToDTOConverters';

const BCRYPT_SALT_ROUNDS = 10;

@Injectable()
export class UsersService {
  constructor(
    private readonly neo4jService: Neo4jService,
    private configService: ConfigService,
  ) {}
  async getPasswordForAuth(username: string): Promise<QueryStringResponse> {
    try {
      const driver = this.neo4jService.getDriver();
      const result = await driver.executeQuery(
        `MATCH (user:USER{username: $name})
        RETURN user.password`,
        { name: username },
        { database: 'neo4j' },
      );
      const hashedPassword = result.records[0].get('user.password');
      return {
        success: true,
        value: hashedPassword,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        value: undefined,
      };
    }
  }
  async findOne(username: string): Promise<QuerySingleEntityResponse> {
    try {
      const driver = this.neo4jService.getDriver();
      const result = await driver.executeQuery(
        `MATCH (user:USER{username: $name})
        MATCH (user)-[IS]->(r:ROLE)
        MATCH (r)-[HAS]->(p:PERMISSION)
        RETURN
          user,
          COLLECT (DISTINCT r) AS roles,
          COLLECT (DISTINCT p) AS permissions`,
        { name: username },
        { database: 'neo4j' },
      );
      const userDTO = convertUserToUserDetailedDTO(result.records[0]);
      console.log(userDTO);
      return {
        success: true,
        item: userDTO,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        item: undefined,
      };
    }
  }

  async createNewUser(
    username: string,
    password: string,
    extraRoles: Roles[] = [],
  ): Promise<QuerySingleEntityResponse> {
    try {
      const roles = [Roles.USER, ...extraRoles];
      const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
      const driver = this.neo4jService.getDriver();
      const result = await driver.executeQuery(
        `CREATE (user:USER{id: randomUUID(), username: $name, password: $pass})
        WITH user
        UNWIND $rolesToGive as roleLabels
        MATCH (r:ROLE {label: roleLabels})
        CREATE (user)-[:IS]->(r)
        RETURN 
        user, 
        COLLECT(DISTINCT r) AS roles`,
        {
          name: username,
          pass: hashedPassword,
          rolesToGive: roles,
        },
        { database: 'neo4j' },
      );
      const createdUser = convertUserToUserBasicDTO(result.records[0]);
      return {
        success: true,
        item: createdUser,
        message: 'base admin account was successfully created',
      };
    } catch (error) {
      console.log(`error creating user`);
      console.log(error);
      return {
        success: false,
        item: undefined,
        message: `error occured while creating user`,
      };
    }
  }

  async createInitialAdmin(): Promise<QuerySingleEntityResponse> {
    const username = this.configService.get<string>('INITIAL_ADMIN_NAME')!;
    const password = this.configService.get<string>('INITIAL_ADMIN_PASS')!;
    return this.createNewUser(username, password, [Roles.ADMIN]);
  }
}
