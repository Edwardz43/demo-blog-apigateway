import { Body, Controller, OnModuleInit, Post } from '@nestjs/common';
import { LoginRequestDto, LoginResponseDto } from './auth.dto';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { grpcClientOptions } from '../grpc-client.options';
interface AuthService {
  login(data: LoginRequestDto): LoginResponseDto;
}
@Controller('auth')
export class AuthController implements OnModuleInit, AuthService {
  @Client(grpcClientOptions)
  private readonly client: ClientGrpc;
  private service: AuthService;

  onModuleInit() {
    this.service = this.client.getService<AuthService>('AuthService');
  }

  @Post('login')
  login(@Body() data: LoginRequestDto): LoginResponseDto {
    return this.service.login(data);
  }
}
