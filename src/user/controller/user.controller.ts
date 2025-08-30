import { Post , Body, Param} from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { RegisterUserDto } from 'src/user/dtos/registerUser.dto'
import { LoginByEmailDto } from '../dtos/loginByEmail.dto';
import { LoginByMobileNoDto } from '../dtos/loginByMobileNo.dto';

@Controller('users')
export class UserController {
    constructor(private userService : UserService){}
    @Post('/loginByEmail')
    async loginByEmail(@Body() loginByEmailDto : LoginByEmailDto){
        return await this.userService.loginByEmail(loginByEmailDto.email,loginByEmailDto.password);
    }

    @Post('/loginByMobileNo')
    async loginByMobileNo(@Body() loginByMobileNoDto : LoginByMobileNoDto){
        return await this.userService.loginByMobileNo(loginByMobileNoDto.mobileNo , loginByMobileNoDto.password);
    }

    @Post('/registerUser')
    async registerUser(@Body() registerUserDto : RegisterUserDto){
        await this.userService.createUser(registerUserDto);
    }
}
