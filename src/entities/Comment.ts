import {
  BeforeInsert,
  Column,
  Entity as TOEntity,
  Index,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import Entity from "./Entity";
import Post from "./Post";
import User from "./User";
import { makeid } from "../util/helpers";

@TOEntity("comments")
export default class Comment extends Entity {
  constructor(comment: Partial<Comment>) {
    super();
    Object.assign(this, comment);
  }

  @Index()
  @Column()
  identifier: string;

  @Column()
  body: string;

  @Column()
  username: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "username", referencedColumnName: "username" })
  user: User;

  @ManyToOne(() => Post, (p) => p.comments, { nullable: false })
  post: Post;

  @BeforeInsert()
  makeIdentifier() {
    this.identifier = makeid(8);
  }
}
