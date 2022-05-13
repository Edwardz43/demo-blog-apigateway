import {
  Body,
  Controller,
  Inject,
  LoggerService,
  OnModuleInit,
  Post,
} from '@nestjs/common';
import {
  LoginRequestDto,
  LoginResponseDto,
  RegisterRequestDto,
  RegisterResponseDto,
} from './auth.dto';
import { ClientGrpc } from '@nestjs/microservices';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
interface AuthService {
  register(data: RegisterRequestDto): RegisterResponseDto;
  login(data: LoginRequestDto): LoginResponseDto;
}
@Controller('auth')
export class AuthController implements OnModuleInit, AuthService {
  constructor(
    @Inject('AUTH_PROVIDER') private readonly client: ClientGrpc,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}
  private service: AuthService;

  onModuleInit() {
    this.service = this.client.getService<AuthService>('AuthService');
  }

  @Post('register')
  register(@Body() data: RegisterRequestDto): RegisterResponseDto {
    this.logger.log({
      controller: 'auth',
      action: 'register',
      data: { email: data.email },
    });
    return this.service.register(data);
  }

  @Post('login')
  login(@Body() data: LoginRequestDto): LoginResponseDto {
    this.logger.log({
      controller: 'auth',
      action: 'login',
      data: { email: data.email },
    });
    return this.service.login(data);
  }
}
