import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Inject,
  LoggerService,
  OnModuleInit,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
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
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

interface UserService {
  findById(data: FindUserByIdRequestDto): FindUserResponseDto;
  findByEmail(data: FindUserByEmailRequestDto): FindUserResponseDto;
  update(data: UpdateUserRequestDto): UpdateUserResponseDto;
  delete(data: DeleteUserRequestDto): DeleteUserResponseDto;
}

@Controller('user')
export class UserController implements OnModuleInit {
  constructor(
    @Inject('USER_PROVIDER') private readonly client: ClientGrpc,
    @Inject('JWT_SECRET') private readonly secretKey: string,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    private readonly jwtService: JwtService,
  ) {}

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

  @UseGuards(AuthGuard())
  @ApiBearerAuth('jwt')
  @Patch()
  update(
    @Headers() headers,
    @Body() updateUserDto: UpdateUserRequestDto,
  ): UpdateUserResponseDto {
    const token = headers.authorization.split(' ')[1];
    const payload = this.jwtService.verify(token, {
      secret: this.secretKey,
    });
    if (!payload['id'] || payload['id'] !== updateUserDto.user.id) {
      this.logger.warn({
        controller: 'user',
        action: 'update',
        message: 'User not authorized to update user',
        payload,
        userId: updateUserDto.user.id,
      });
      return { message: 'invalid user info' };
    }
    return this.userService.update(updateUserDto);
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth('jwt')
  @Delete()
  delete(@Body() deleteUserDto: DeleteUserRequestDto): DeleteUserResponseDto {
    this.logger.log({
      controller: 'user',
      action: 'delete',
      deleteUserDto,
    });
    return this.userService.delete(deleteUserDto);
  }
}
