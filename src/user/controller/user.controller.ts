import { Post , Body} from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { RegisterUserDto } from 'src/user/dtos/registerUser.dto'

@Controller('users')
export class UserController {
    constructor(private userService : UserService){}
    @Post('/loginByEmail')
    async loginByEmail(){
        await this.userService.loginByEmail();
    }

    @Post('/loginByMobileNo')
    async loginByMobileNo(){
        await this.userService.loginByMobileNo();
    }

    @Post('/registerUser')
    async registerUser(@Body() registerUserDto : RegisterUserDto){
        await this.userService.createUser(registerUserDto);
    }
}
