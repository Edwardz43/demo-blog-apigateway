import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: ['user'],
    protoPath: [join(__dirname, './protos/user.proto')],
    url: 'localhost:5051',
  },
};
