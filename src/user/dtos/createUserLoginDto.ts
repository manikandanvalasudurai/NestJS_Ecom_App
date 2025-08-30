import { IsNotEmpty, IsString , IsNumber , IsEmail , Validate} from "class-validator";
import { IsEmailUnique } from 'src/common/validators/is-email-unique.validator';
import { IsMobileNoUnique } from 'src/common/validators/is-mobileNo-unique.validator';

export class CreateUserLoginDto{

    @IsEmail()
    @IsNotEmpty()
    @Validate(IsEmailUnique)
    email: string;

    @IsNumber()
    @IsNotEmpty()
    @Validate(IsMobileNoUnique)
    mobileno: number;

    @IsString()
    @IsNotEmpty()
    password: string;
}