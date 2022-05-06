import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: ['user', 'auth'],
    protoPath: [
      join(__dirname, './protos/user.proto'),
      join(__dirname, './protos/auth.proto'),
    ],
    url: 'localhost:5051',
  },
};
