import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [PostController],
})
export class PostModule {}
