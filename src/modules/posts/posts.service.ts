// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class PostsService {}



import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepo: Repository<Post>,
  ) {}

  create(createDto: CreatePostDto, user: any) {
    const p = this.postRepo.create({ ...createDto, user });
    return this.postRepo.save(p);
  }

  findAll() {
    return this.postRepo.find({ relations: ['user'] });
  }

  findOne(id: number) {
    return this.postRepo.findOne({ where: { id }, relations: ['user'] });
  }

  async update(id: number, attrs: Partial<Post>) {
    const post = await this.postRepo.findOne({ where: { id } });
    if (!post) throw new NotFoundException('Post not found');
    Object.assign(post, attrs);
    return this.postRepo.save(post);
  }

  async remove(id: number) {
    const post = await this.postRepo.findOne({ where: { id } });
    if (!post) throw new NotFoundException('Post not found');
    return this.postRepo.remove(post);
  }

  async findByUser(userId: number) {
    return this.postRepo.find({ where: { user: { id: userId } }, relations: ['user'] });
  }
}

