import { ObjectId } from "mongodb";
import { Entity, Column, BaseEntity, ObjectIdColumn } from "typeorm";

@Entity("students")
export class Students extends BaseEntity {
  @ObjectIdColumn()
  _id: ObjectId = new ObjectId();
  studentID!: number;
  @Column()
  studentFName!: string;
  @Column()
  studentLName?: string;
  @Column()
  dateOfBirth!: string;
  @Column()
  email!: string;
  @Column()
  department!: string;
  @Column()
  alumnai?: boolean | false;
}
