import { Body, Controller, OnModuleInit, Post } from '@nestjs/common';
import { CreatePostRequestDto, CreatePostResponseDto } from './post.dto';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { grpcClientOptions } from '../grpc-client.options';

interface PostService {
  create(post: CreatePostRequestDto): CreatePostResponseDto;
}

@Controller('post')
export class PostController implements OnModuleInit, PostService {
  @Client(grpcClientOptions)
  private readonly client: ClientGrpc;
  private postService: PostService;

  onModuleInit() {
    this.postService = this.client.getService<PostService>('PostService');
  }
  @Post()
  create(@Body() post: CreatePostRequestDto): CreatePostResponseDto {
    return this.postService.create(post);
  }
}
