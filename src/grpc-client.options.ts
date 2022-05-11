import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: ['user', 'auth', 'post', 'upload'],
    protoPath: [
      join(__dirname, './protos/user.proto'),
      join(__dirname, './protos/auth.proto'),
      join(__dirname, './protos/post.proto'),
      join(__dirname, './protos/upload.proto'),
    ],
    // For Docker, use the following:
    // url: 'api:50001',
    // For local development, use the following:
    url: '0.0.0.0:50001',
  },
};
