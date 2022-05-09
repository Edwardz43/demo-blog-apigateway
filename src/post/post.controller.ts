import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  OnModuleInit,
  Param,
  Patch,
  Post,
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
import { JwtService } from '@nestjs/jwt';

interface PostService {
  create(post: CreatePostRequestDto): CreatePostResponseDto;
  findByAuthor(authorId: FindByAuthorRequestDto): FindByAuthorResponseDto;
  findById(id: FindByIdRequestDto): PostDto;
  update(post: UpdatePostRequestDto): UpdatePostResponseDto;
  delete(data: any): DeletePostResponseDto;
}

@Controller('post')
export class PostController implements OnModuleInit {
  @Client(grpcClientOptions)
  private readonly client: ClientGrpc;
  private postService: PostService;
  constructor(private readonly jwtService: JwtService) {}

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
  @Patch()
  update(@Body() post: UpdatePostRequestDto): UpdatePostResponseDto {
    return this.postService.update(post);
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth('jwt')
  @Delete()
  delete(
    @Headers() headers,
    @Body() data: DeletePostRequestDto,
  ): DeletePostResponseDto {
    const h = { ...headers };
    const payload = this.jwtService.verify(h.authorization.split(' ')[1], {
      secret: 'secretKey',
    });
    const userId = payload['id'];
    const email = payload['email'];
    return this.postService.delete({
      userId,
      email,
      id: data.id,
    });
  }
}
