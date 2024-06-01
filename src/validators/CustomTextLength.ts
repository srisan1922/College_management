import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

//To design the custom validation in class validation

@ValidatorConstraint({ name: "customeText", async: false })
// validation constraint name - this name will be used as "error type" in ValidationError.
//If you will not supply a constraint name - it will be auto-generated.
export class CustomTextLength implements ValidatorConstraintInterface {
  validate(text: string, args?: ValidationArguments | undefined): boolean {
    return text.length > 1 && text.length < 10;
  }

  defaultMessage(args?: ValidationArguments | undefined): string {
    return "Text ($value) is too short or too long!";
  }
}

// @ValidatorConstraint()
// export class CustomTextLength implements ValidatorConstraintInterface {
//   validate(text: string, args: ValidationArguments) {
//     return text.length > args.constraints[0] && text.length < validationArguments.constraints[1];
//   }
// }
