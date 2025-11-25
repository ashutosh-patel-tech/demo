import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Post } from '../posts/post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  // 3 main fields (excluding id): name, email, password
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
