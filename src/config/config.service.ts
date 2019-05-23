import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService implements TypeOrmOptionsFactory {
  private readonly envConfig: { [key: string]: string };

  constructor(filePath: string) {
    this.envConfig = dotenv.parse(fs.readFileSync(__dirname + '/' + filePath));
  }

  get(key: string): string {
    return this.envConfig[key];
  }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.get('POSTGRES_HOST'),
      port: Number.parseInt(this.get('POSTGRES_PORT'), 10),
      username: this.get('POSTGRES_USERNAME'),
      password: this.get('POSTGRES_PASSWORD'),
      database: this.get('POSTGRES_DATABASE'),
      entities: [this.get('POSTGRES_ENTITIES')],
      synchronize: this.get('POSTGRES_SYNCHRONIZE') === 'true',
      logging: this.get('POSTGRES_LOGGING') === 'true'
    };
  }
}
