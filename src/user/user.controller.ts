import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Headers,
  OnModuleInit,
  Param,
  Patch,
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
import { JwtService } from '@nestjs/jwt';

interface UserService {
  findById(data: FindUserByIdRequestDto): FindUserResponseDto;
  findByEmail(data: FindUserByEmailRequestDto): FindUserResponseDto;
  update(data: UpdateUserRequestDto): UpdateUserResponseDto;
  delete(data: DeleteUserRequestDto): DeleteUserResponseDto;
}

@Controller('user')
export class UserController implements OnModuleInit {
  @Client(grpcClientOptions)
  private readonly client: ClientGrpc;
  private userService: UserService;

  constructor(private readonly jwtService: JwtService) {}

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

  @UseGuards(AuthGuard())
  @ApiBearerAuth('jwt')
  @Patch()
  update(
    @Headers() headers,
    @Body() updateUserDto: UpdateUserRequestDto,
  ): UpdateUserResponseDto {
    const h = { ...headers };
    const payload = this.jwtService.verify(h.authorization.split(' ')[1], {
      secret: 'secretKey',
    });
    if (!payload['id'] || payload['id'] !== updateUserDto.user.id) {
      return { message: 'invalid user info' };
    }
    return this.userService.update(updateUserDto);
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth('jwt')
  @Delete()
  delete(@Body() deleteUserDto: DeleteUserRequestDto): DeleteUserResponseDto {
    return this.userService.delete(deleteUserDto);
  }
}
