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
