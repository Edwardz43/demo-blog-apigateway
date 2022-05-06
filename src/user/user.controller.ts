import { Body, Controller, OnModuleInit, Post } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { grpcClientOptions } from '../grpc-client.options';
import { CreateUserRequestDto, CreateUserResponseDto } from './user.dto';

interface UserService {
  create(data: CreateUserRequestDto): CreateUserResponseDto;
}

@Controller('user')
export class UserController implements OnModuleInit, UserService {
  @Client(grpcClientOptions)
  private readonly client: ClientGrpc;
  private userService: UserService;

  onModuleInit() {
    this.userService = this.client.getService<UserService>('UserService');
  }
  @Post()
  create(@Body() createUserDto: CreateUserRequestDto): CreateUserResponseDto {
    return this.userService.create(createUserDto);
  }
}
