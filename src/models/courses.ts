import { Entity, BaseEntity, ObjectIdColumn, Column } from "typeorm";
import { ObjectId } from "mongodb";

@Entity("courses")
export class Courses extends BaseEntity {
  @ObjectIdColumn()
  _id: ObjectId = new ObjectId();
  courseID!: number;

  @Column()
  courseName!: string;
  @Column()
  description?: string | "Newly added Syllabus/Course";
  @Column()
  credits!: number;
  @Column()
  instructor?: string;
}
