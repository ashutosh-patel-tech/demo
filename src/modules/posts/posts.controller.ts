// import { Controller } from '@nestjs/common';

// @Controller('posts')
// export class PostsController {}


import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post as HttpPost,
  Put,
  UseGuards,
  Req,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  getAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.postsService.findOne(+id);
  }

  @HttpPost()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreatePostDto, @Req() req: any) {
    const user = req.user;
    return this.postsService.create(dto, user);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: number, @Body() dto: UpdatePostDto, @Req() req: any) {
    // optionally confirm req.user is owner — omitted for brevity
    return this.postsService.update(+id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: number, @Req() req: any) {
    // optionally confirm req.user is owner — omitted for brevity
    return this.postsService.remove(+id);
  }

  @Get('user/:userId')
  getByUser(@Param('userId') userId: number) {
    return this.postsService.findByUser(+userId);
  }
}

