import {
  Body,
  Controller,
  OnModuleInit,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreatePostRequestDto, CreatePostResponseDto } from './post.dto';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { grpcClientOptions } from '../grpc-client.options';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

interface PostService {
  create(post: CreatePostRequestDto): CreatePostResponseDto;
}

@UseGuards(AuthGuard())
@ApiBearerAuth('jwt')
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
