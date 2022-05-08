import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class PostDto {
  @ApiModelProperty({
    description: 'Post ID',
    required: true,
    type: Number,
    example: 1,
  })
  id: number;
  @ApiModelProperty({
    description: 'Post title',
    required: true,
    type: String,
    example: 'My first post',
  })
  title: string;
  @ApiModelProperty({
    description: 'Post content',
    type: String,
    example: 'Long time ago in a galaxy far far away...',
  })
  content?: string;
  @ApiModelProperty({
    description: 'Author Name',
    type: String,
    example: 'somebody',
  })
  author?: string;
  @ApiModelProperty({
    description: 'Author ID',
    required: true,
    type: Number,
    example: 1,
  })
  authorId: number;
  @ApiModelProperty({
    description: 'Post creation date',
    required: true,
    type: Date,
    example: '2022-01-01 12:34:56',
  })
  createdAt: Date;
  @ApiModelProperty({
    description: 'Post last update date',
    required: true,
    example: '2022-01-02 12:34:56',
  })
  updatedAt: Date;
}

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

export class FindByAuthorRequestDto {
  @ApiModelProperty({
    description: 'Author ID',
    required: true,
    type: Number,
    example: 1,
  })
  authorId: number;
}

export class FindByAuthorResponseDto {
  @ApiModelProperty({
    description: 'Post List',
  })
  postList: PostDto;
}
