import {
  BeforeInsert,
  Column,
  Entity as TOEntity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import Entity from "./Entity";
import User from "./User";
import { makeid, slugify } from "../util/helpers";
import Sub from "./Sub";
import Comment from "./Comment";

@TOEntity("posts")
export default class Post extends Entity {
  constructor(post: Partial<Post>) {
    super();
    Object.assign(this, post);
  }

  @Index()
  @Column()
  identifier: string;

  @Column()
  title: string;

  @Index()
  @Column()
  slug: string;

  @Column()
  subName: string;

  @Column({ nullable: true, type: "text" })
  body: string;

  @OneToMany(() => Comment, (c) => c.post)
  comments: Comment[];

  @ManyToOne(() => User, (u) => u.posts, { nullable: false })
  @JoinColumn({ name: "username", referencedColumnName: "username" })
  user: User;

  @ManyToOne(() => Sub, (s) => s.posts, { nullable: false })
  @JoinColumn({ name: "subName", referencedColumnName: "name" })
  sub: Sub;

  @BeforeInsert()
  makeIdAndSlug() {
    this.identifier = makeid(7);
    this.slug = slugify(this.title);
  }
}
