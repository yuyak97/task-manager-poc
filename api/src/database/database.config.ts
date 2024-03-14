import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigData } from 'src/config/configuration';
import { Env } from 'src/enums/env.enum';
import { Task } from './entities/task.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService<ConfigData, true>) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get('host', {
        infer: true,
      }),
      port: this.configService.get('port', {
        infer: true,
      }),
      username: this.configService.get('username', {
        infer: true,
      }),
      password: this.configService.get('password', {
        infer: true,
      }),
      database: this.configService.get('database', {
        infer: true,
      }),
      entities: [Task],
      synchronize:
        this.configService.get('database', {
          infer: true,
        }) === Env.LOCAL, // For prod, synchronize must be false
    };
  }
}
