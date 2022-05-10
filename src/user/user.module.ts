import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'secretKey',
    }),
  ],
  controllers: [UserController],
})
export class UserModule {}
