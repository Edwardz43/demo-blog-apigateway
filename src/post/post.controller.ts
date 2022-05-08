import {
  Body,
  Controller,
  Delete,
  Get,
  OnModuleInit,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  CreatePostRequestDto,
  CreatePostResponseDto,
  DeletePostRequestDto,
  DeletePostResponseDto,
  FindByAuthorRequestDto,
  FindByAuthorResponseDto,
  FindByIdRequestDto,
  PostDto,
  UpdatePostRequestDto,
  UpdatePostResponseDto,
} from './post.dto';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { grpcClientOptions } from '../grpc-client.options';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

interface PostService {
  create(post: CreatePostRequestDto): CreatePostResponseDto;
  findByAuthor(authorId: FindByAuthorRequestDto): FindByAuthorResponseDto;
  findById(id: FindByIdRequestDto): PostDto;
  update(post: UpdatePostRequestDto): UpdatePostResponseDto;
  delete(data: DeletePostRequestDto): DeletePostResponseDto;
}

@Controller('post')
export class PostController implements OnModuleInit {
  @Client(grpcClientOptions)
  private readonly client: ClientGrpc;
  private postService: PostService;

  onModuleInit() {
    this.postService = this.client.getService<PostService>('PostService');
  }
  @UseGuards(AuthGuard())
  @ApiBearerAuth('jwt')
  @Post()
  create(@Body() post: CreatePostRequestDto): CreatePostResponseDto {
    return this.postService.create(post);
  }

  @Get('author/:authorId')
  findByAuthor(
    @Param() query: FindByAuthorRequestDto,
  ): FindByAuthorResponseDto {
    return this.postService.findByAuthor({
      authorId: query.authorId,
    });
  }

  @Get(':id')
  findById(@Param() query: FindByIdRequestDto): PostDto {
    return this.postService.findById({ id: query.id });
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth('jwt')
  @Put()
  update(@Body() post: UpdatePostRequestDto): UpdatePostResponseDto {
    return this.postService.update(post);
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth('jwt')
  @Delete()
  delete(@Body() data: DeletePostRequestDto): DeletePostResponseDto {
    return this.postService.delete(data);
  }
}
