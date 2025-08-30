import { IsString , IsNotEmpty , IsEmail , Validate, isMobilePhone } from "class-validator";
import { IsEmailUnique } from 'src/common/validators/is-email-unique.validator';
import { IsMobileNoUnique } from 'src/common/validators/is-mobileNo-unique.validator';

export class RegisterUserDto{
    @IsString()
    @IsNotEmpty()
    userName: string;

    @IsEmail()
    @IsNotEmpty()
    @Validate(IsEmailUnique)
    eMail: string;

    @IsString()
    @IsNotEmpty()
    @Validate(IsMobileNoUnique)
    mobileNo: string;

    @IsString()
    @IsNotEmpty()
    password: string;

}