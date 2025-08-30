import { IsString , IsNotEmpty , IsEmail , Validate, IsNumber } from "class-validator";
import { IsEmailUnique } from 'src/common/validators/is-email-unique.validator';
import { IsMobileNoUnique } from 'src/common/validators/is-mobileNo-unique.validator';

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @Validate(IsEmailUnique)
  email: string;

  @IsNumber()
  @IsNotEmpty()
  @Validate(IsMobileNoUnique)
  mobileNo: number;

  @IsString()
  @IsNotEmpty()
  password: string;
}
