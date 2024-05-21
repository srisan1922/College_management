import { Entity, BaseEntity, ObjectIdColumn, Column } from "typeorm";
import { ObjectId } from "mongodb";

@Entity("departments")
export class Department extends BaseEntity {
  @ObjectIdColumn()
  _id: ObjectId = new ObjectId();
  @Column()
  departmentID!: number;
  @Column()
  departmentName!: string;
  @Column()
  headOfTheDepartment!: string;
  @Column()
  officeLocation?: string;
  @Column()
  contactNumber!: number;
}
