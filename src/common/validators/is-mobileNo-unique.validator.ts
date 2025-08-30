import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from "class-validator";
import { User } from "src/typeorm/entities/User";
import { Repository } from "typeorm";

@ValidatorConstraint({ async: true })
@Injectable()
export class IsMobileNoUnique implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async validate(value: any) {
    const user = await this.userRepository.findOne({ where: { mobileNo: value } });
    return !user;  // ✅ return true if mobileNo does NOT exist
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be unique`;
  }
}
