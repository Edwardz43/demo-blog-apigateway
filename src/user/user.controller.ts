import {
  Body,
  Controller,
  Get,
  OnModuleInit,
  Param,
  Post,
} from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { grpcClientOptions } from '../grpc-client.options';
import {
  CreateUserRequestDto,
  FindOrCreateUserResponseDto, FindUserByEmailRequestDto,
  FindUserByIdRequestDto
} from "./user.dto";

interface UserService {
  create(data: CreateUserRequestDto): FindOrCreateUserResponseDto;
  findById(data: FindUserByIdRequestDto): FindOrCreateUserResponseDto;
  findByEmail(data: FindUserByEmailRequestDto): FindOrCreateUserResponseDto;
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
  create(
    @Body() createUserDto: CreateUserRequestDto,
  ): FindOrCreateUserResponseDto {
    return this.userService.create(createUserDto);
  }

  @Get('id/:id')
  findById(@Param() data: FindUserByIdRequestDto): FindOrCreateUserResponseDto {
    return this.userService.findById(data);
  }

  @Get('email/:email')
  findByEmail(@Param() data: FindUserByEmailRequestDto): FindOrCreateUserResponseDto {
    return this.userService.findByEmail(data);
  }
}
