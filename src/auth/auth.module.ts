import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    {
      provide: 'AUTH_PROVIDER',
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.GRPC,
          options: {
            package: ['auth'],
            protoPath: [join(__dirname, '../protos/auth.proto')],
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
export class AuthModule {}
