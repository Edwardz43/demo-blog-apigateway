import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [UserController],
})
export class UserModule {}
