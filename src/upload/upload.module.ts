import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UploadController } from './upload.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '5m' },
    }),
  ],
  controllers: [UploadController],
})
export class UploadModule {}
