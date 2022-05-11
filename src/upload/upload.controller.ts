import {
  Controller,
  Headers,
  OnModuleInit,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { grpcClientOptions } from '../grpc-client.options';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

interface UploadService {
  upload(data: any): string;
}

@UseGuards(AuthGuard())
@ApiBearerAuth('jwt')
@Controller('upload')
export class UploadController implements OnModuleInit {
  @Client(grpcClientOptions)
  private readonly client: ClientGrpc;
  private uploadService: UploadService;
  constructor(private readonly jwtService: JwtService) {}

  onModuleInit() {
    this.uploadService = this.client.getService<UploadService>('UploadService');
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        comment: { type: 'string' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Headers() headers,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const payload = this.parseToken(headers);
    const userId = payload['id'];
    const data = Uint16Array.from(file.buffer);
    return this.uploadService.upload({ userId: userId, file: data });
  }

  private parseToken(headers: object) {
    const payload = this.jwtService.verify(
      headers['authorization'].split(' ')[1],
      {
        secret: 'secretKey',
      },
    );
    return payload;
  }
}
