import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class RegisterRequestDto {
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

export class RegisterResponseDto {
  @ApiModelProperty({
    description: 'User id',
    required: true,
  })
  id: number;
  @ApiModelProperty({
    description: 'User name',
    required: true,
    type: String,
    example: 'someUser@example.com',
  })
  @ApiModelProperty({
    description: 'User name',
    example: 'someone',
  })
  name: string;
}

export class LoginRequestDto {
  @ApiModelProperty({
    description: 'User name',
    required: true,
    type: String,
    example: 'someUser@example.com',
  })
  email: string;
  @ApiModelProperty({
    description: 'User password',
    required: true,
    type: String,
    example: '1234@_Ggxx',
  })
  password: string;
}

export class LoginResponseDto {
  @ApiModelProperty({
    description: 'Login token',
    required: true,
  })
  token: string;
}
