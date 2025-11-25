// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class UsersService {}


import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  create(user: Partial<User>) {
    const u = this.userRepo.create(user);
    return this.userRepo.save(u);
  }

  findAll() {
    return this.userRepo.find({ relations: ['posts'] });
  }

  findOne(id: number) {
    return this.userRepo.findOne({ where: { id }, relations: ['posts'] });
  }

  async findByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    Object.assign(user, attrs);
    return this.userRepo.save(user);
  }

  async remove(id: number) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return this.userRepo.remove(user);
  }
}
