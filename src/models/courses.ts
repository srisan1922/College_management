import { Entity, BaseEntity, ObjectIdColumn, Column } from "typeorm";
import { ObjectId } from "mongodb";
import { IsInt, Length, Max, Min } from "class-validator";

@Entity("courses")
export class Courses extends BaseEntity {
  @ObjectIdColumn()
  _id: ObjectId = new ObjectId();
  courseID!: number;

  @Column()
  @Length(10, 20)
  courseName!: string;

  @Column()
  @Length(10, 50)
  description?: string | "Newly added Syllabus/Course";

  @IsInt()
  @Min(1)
  @Max(5)
  @Column()
  credits!: number;

  @Column()
  @Length(10, 20)
  instructor?: string;
}
