import bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { IsEmail, MinLength } from 'class-validator';
import {
  BeforeInsert,
  Column,
  Entity as TOEntity,
  Index,
  OneToMany
} from 'typeorm';
import Entity from './Entity';
import Post from './Post';

@TOEntity('Users')
export default class User extends Entity {
  constructor(user: Partial<User>) {
    super();
    Object.assign(this, user);
  }

  @Index()
  @IsEmail()
  @Column({ unique: true })
  email: string;

  @Index()
  @MinLength(3, { message: 'Username must be atleast 3 characters long' })
  @Column({ unique: true })
  username: string;

  @Exclude()
  @Column()
  @MinLength(6)
  password: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 6);
  }
}
