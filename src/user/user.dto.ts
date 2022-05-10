import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class UserDto {
  @ApiModelProperty({
    required: true,
    example: 1,
    type: Number,
    description: 'User id',
  })
  id: number;
  @ApiModelProperty({
    example: 'Foo',
    type: String,
    description: 'User name',
  })
  name: string;
  @ApiModelProperty({
    example: 'foo_bar@example.com',
    type: String,
    description: 'User email',
  })
  email: string;
}

export class UserProfileDto {
  @ApiModelProperty({
    type: Number,
    example: 20,
    description: 'User age',
  })
  age?: number;
  @ApiModelProperty({
    type: String,
    example: 1,
    description: 'User phone number',
  })
  phone?: string;
  @ApiModelProperty({
    type: String,
    example: 1,
    description: 'User address',
  })
  address?: string;
  @ApiModelProperty({
    type: Date,
    example: '1989-06-04',
    description: 'User birthday',
  })
  birthday?: Date;
}

export class FindUserResponseDto {
  @ApiModelProperty({
    description: 'User id',
    required: true,
  })
  id: number;
  @ApiModelProperty({
    description: 'User name',
    example: 'someone',
  })
  name: string;
}

export class FindUserByIdRequestDto {
  @ApiModelProperty({
    description: 'User id',
    required: true,
    type: Number,
    example: 1,
  })
  id: number;
}
export class FindUserByEmailRequestDto {
  @ApiModelProperty({
    description: 'User email',
    required: true,
    type: String,
    example: 'someUser@example.com',
  })
  email: string;
}

export class UpdateUserRequestDto {
  @ApiModelProperty({
    description: 'User info',
    required: true,
    type: UserDto,
  })
  user: UserDto;
  @ApiModelProperty({
    description: 'User profile',
    required: true,
    type: UserProfileDto,
  })
  profile: UserProfileDto;
}

export class UpdateUserResponseDto {
  @ApiModelProperty({
    description: 'Update result',
    type: String,
  })
  message: string;
}

export class DeleteUserRequestDto {
  @ApiModelProperty({
    description: 'User name',
    required: true,
    type: String,
    example: 'someUser@example.com',
  })
  email: string;
  @ApiModelProperty({
    description: 'User login token',
    required: true,
    type: String,
    example: 'secretToken',
  })
  token: string;
}

export class DeleteUserResponseDto {
  @ApiModelProperty({
    description: 'Delete user result',
    required: true,
    type: String,
    example: 'ok',
  })
  message: string;
}
