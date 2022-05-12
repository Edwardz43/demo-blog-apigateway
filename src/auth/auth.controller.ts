import { Body, Controller, Inject, OnModuleInit, Post } from '@nestjs/common';
import {
  LoginRequestDto,
  LoginResponseDto,
  RegisterRequestDto,
  RegisterResponseDto,
} from './auth.dto';
import { ClientGrpc } from '@nestjs/microservices';
interface AuthService {
  register(data: RegisterRequestDto): RegisterResponseDto;
  login(data: LoginRequestDto): LoginResponseDto;
}
@Controller('auth')
export class AuthController implements OnModuleInit, AuthService {
  constructor(@Inject('AUTH_PROVIDER') private readonly client: ClientGrpc) {}
  private service: AuthService;

  onModuleInit() {
    this.service = this.client.getService<AuthService>('AuthService');
  }

  @Post('register')
  register(@Body() createUserDto: RegisterRequestDto): RegisterResponseDto {
    return this.service.register(createUserDto);
  }

  @Post('login')
  login(@Body() data: LoginRequestDto): LoginResponseDto {
    return this.service.login(data);
  }
}
