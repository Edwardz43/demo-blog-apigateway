import {
  Body,
  Controller, Delete,
  Get,
  OnModuleInit,
  Param,
  Post,
  Put,
  UseGuards
} from "@nestjs/common";
import { Client, ClientGrpc } from '@nestjs/microservices';
import { grpcClientOptions } from '../grpc-client.options';
import {
  CreateUserRequestDto, DeleteUserRequestDto, DeleteUserResponseDto,
  FindOrCreateUserResponseDto,
  FindUserByEmailRequestDto,
  FindUserByIdRequestDto,
  UpdateUserRequestDto,
  UpdateUserResponseDto
} from "./user.dto";
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

interface UserService {
  create(data: CreateUserRequestDto): FindOrCreateUserResponseDto;
  findById(data: FindUserByIdRequestDto): FindOrCreateUserResponseDto;
  findByEmail(data: FindUserByEmailRequestDto): FindOrCreateUserResponseDto;
  update(data: UpdateUserRequestDto): UpdateUserResponseDto;
  delete(data: DeleteUserRequestDto): DeleteUserResponseDto;
}

@UseGuards(AuthGuard())
@ApiBearerAuth('jwt')
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
  findByEmail(
    @Param() data: FindUserByEmailRequestDto,
  ): FindOrCreateUserResponseDto {
    return this.userService.findByEmail(data);
  }

  @Put()
  update(@Body() updateUserDto: UpdateUserRequestDto): UpdateUserResponseDto {
    return this.userService.update(updateUserDto);
  }

  @Delete()
  delete(@Body() deleteUserDto: DeleteUserRequestDto): DeleteUserResponseDto {
    return this.userService.delete(deleteUserDto);
  }
}
