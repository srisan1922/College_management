import {
  IsDate,
  IsEmail,
  Length,
  MaxLength,
  MinLength,
  Validate,
  ValidationArguments,
} from "class-validator";
import { ObjectId } from "mongodb";
import { Entity, Column, BaseEntity, ObjectIdColumn } from "typeorm";
import { CustomTextLength } from "../validators/CustomTextLength";

@Entity("students")
export class Students extends BaseEntity {
  @ObjectIdColumn()
  _id: ObjectId = new ObjectId();
  studentID!: number;

  @Column()
  @Length(5, 25)
  studentFName!: string;

  @Column()
  @MinLength(1, {
    message: "Student Lastname is too short",
    // Also we can add the message like
    // here, $constraint1 will be replaced with "10", and $value with actual supplied value
    // message: 'Title is too short. Minimal length is $constraint1 characters, but actual is $value'

    /**
     * $value - the value that is being validated
       $property - name of the object's property being validated
       $target - name of the object's class being validated
       $constraint1, $constraint2, ... $constraintN - constraints defined by specific validation type
     */
  })
  @MaxLength(15, {
    message: "Student Lastname is too long",
  })
  studentLName?: string;

  @Column()
  @IsDate()
  dateOfBirth?: Date = new Date("1990-01-01");

  @Column()
  @IsEmail()
  email!: string;

  @Column()
  @MinLength(3, {
    message: (args: ValidationArguments) => {
      if (args.value.length === 1) {
        return "Too short, minimum length is 1 character";
      } else {
        return (
          "Too short, minimum length is " + args.constraints[0] + " characters"
        );
      }
    },
    /**
      value - the value that is being validated
      constraints - array of constraints defined by specific validation type
      targetName - name of the object's class being validated
      object - object that is being validated
      property - name of the object's property being validated
     */
  })
  department?: string;

  @Column()
  alumnai?: boolean | false;
}
