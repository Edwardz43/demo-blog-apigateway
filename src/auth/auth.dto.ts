import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

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
