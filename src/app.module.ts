import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { PostModule } from './post/post.module';
import { UploadModule } from './upload/upload.module';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { format, transports } from 'winston';
import { WinstonModule } from 'nest-winston';
import { join } from 'path';
import DailyRotateFile = require('winston-daily-rotate-file');

@Module({
  imports: [
    UserModule,
    AuthModule,
    PassportModule,
    PostModule,
    UploadModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    ConfigModule,
    WinstonModule.forRoot({
      format: format.combine(format.timestamp(), format.json()),
      transports: new DailyRotateFile({
        dirname: join(__dirname, `./../log/`),
        filename: '%DATE%.log',
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true,
        maxSize: '10m',
        maxFiles: '7d',
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
