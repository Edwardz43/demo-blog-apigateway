import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class CreatePostRequestDto {
  @ApiModelProperty({
    description: 'Title of the post',
    required: true,
    example: 'My first post',
  })
  title: string;
  @ApiModelProperty({
    description: 'Content of the post',
    example: 'Long time ago in a galaxy far far away...',
  })
  content?: string;
  @ApiModelProperty({
    description: 'Author ID of the post',
    required: true,
    example: 1,
  })
  authorId: number;
  @ApiModelProperty({
    description: 'Is the post published or not',
    default: false,
    example: false,
  })
  isPublished?: boolean;
}

export class CreatePostResponseDto {
  @ApiModelProperty({
    description: 'ID of the post',
    example: 1,
  })
  id: number;
  @ApiModelProperty({
    description: 'Create post result',
    type: String,
  })
  message: string;
}