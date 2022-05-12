import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UploadController } from './upload.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({}),
  ],
  controllers: [UploadController],
  providers: [
    {
      provide: 'UPLOAD_PROVIDER',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.GRPC,
          options: {
            package: ['upload'],
            protoPath: [join(__dirname, '../protos/upload.proto')],
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
export class UploadModule {}
