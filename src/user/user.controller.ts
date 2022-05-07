import {
  Body,
  Controller,
  Delete,
  Get,
  OnModuleInit,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { grpcClientOptions } from '../grpc-client.options';
import {
  DeleteUserRequestDto,
  DeleteUserResponseDto,
  FindUserResponseDto,
  FindUserByEmailRequestDto,
  FindUserByIdRequestDto,
  UpdateUserRequestDto,
  UpdateUserResponseDto,
} from './user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

interface UserService {
  findById(data: FindUserByIdRequestDto): FindUserResponseDto;
  findByEmail(data: FindUserByEmailRequestDto): FindUserResponseDto;
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

  @Get('id/:id')
  findById(@Param() data: FindUserByIdRequestDto): FindUserResponseDto {
    return this.userService.findById(data);
  }

  @Get('email/:email')
  findByEmail(@Param() data: FindUserByEmailRequestDto): FindUserResponseDto {
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
