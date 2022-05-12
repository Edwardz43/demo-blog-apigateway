import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
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
  controllers: [PostController],
  providers: [
    {
      provide: 'POST_PROVIDER',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.GRPC,
          options: {
            package: ['post'],
            protoPath: [join(__dirname, '../protos/post.proto')],
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
export class PostModule {}
