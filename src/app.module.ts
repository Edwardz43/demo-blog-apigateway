import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { PostModule } from './post/post.module';

@Module({
  imports: [UserModule, AuthModule, PassportModule, PostModule],
  providers: [AppService],
})
export class AppModule {}
