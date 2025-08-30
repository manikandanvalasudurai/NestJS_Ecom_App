import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { RegisterUserDto } from 'src/user/dtos/registerUser.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/registerUser')
  async registerUser(@Body() registerUserDto: RegisterUserDto) {
    return await this.userService.createUser(registerUserDto);
  }
}
