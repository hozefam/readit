import { IsEmail, Length } from "class-validator";
import Entity from "./Entity";
import {
  Entity as TOEntity,
  Column,
  Index,
  BeforeInsert,
  OneToMany,
} from "typeorm";
import bcrypt from "bcrypt";
import { Exclude } from "class-transformer";
import Post from "./Post";

@TOEntity("users")
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
  @Length(3, 255, { message: "username must be atleast 3 characters long" })
  @Column({ unique: true })
  username: string;

  @Exclude()
  @Length(6, 255, { message: "password must be atleast 6 characters long" })
  @Column()
  password: string;

  @OneToMany(() => Post, (p) => p.user)
  posts: Post[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 6);
  }
}
