import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({}),
  ],
  controllers: [UserController],
  providers: [
    {
      provide: 'USER_PROVIDER',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.GRPC,
          options: {
            package: ['user'],
            protoPath: [join(__dirname, '../protos/user.proto')],
            url: configService.get<string>('MICROSERVICE_URL'),
          },
        });
      },
    },
    {
      provide: 'JWT_SECRET',
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return configService.get<string>('JWT_SECRET');
      },
    },
  ],
})
export class UserModule {}
