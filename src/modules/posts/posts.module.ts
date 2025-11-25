// import { Module } from '@nestjs/common';
// import { PostsService } from './posts.service';
// import { PostsController } from './posts.controller';

// @Module({
//   providers: [PostsService],
//   controllers: [PostsController]
// })
// export class PostsModule {}




import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}

