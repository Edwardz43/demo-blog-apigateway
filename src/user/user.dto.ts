import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class CreateUserRequestDto {
  @ApiModelProperty({
    description: 'User name',
    required: true,
    type: String,
    example: 'someUser@example.com',
  })
  email: string;
  @ApiModelProperty({
    description: 'User name',
    example: 'someone',
  })
  name: string;
  @ApiModelProperty({
    description: 'User password',
    required: true,
    type: String,
    example: '1234@_Ggxx',
  })
  password: string;
}

export class FindOrCreateUserResponseDto {
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
    required: true,
    example: 1,
    description: 'User id',
  })
  id: number;
  @ApiModelProperty({
    example: 'Foo',
    description: 'User name',
  })
  name: string;
  @ApiModelProperty({
    example: 'foo_bar@example.com',
    description: 'User email',
  })
  email: string;
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
