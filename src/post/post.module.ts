import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'secretKey',
    }),
  ],
  controllers: [PostController],
})
export class PostModule {}
