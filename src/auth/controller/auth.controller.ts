import { Body, Controller, Post, Req , UseGuards } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { LoginByEmailDto } from 'src/user/dtos/loginByEmail.dto';
import { LoginByMobileNoDto } from 'src/user/dtos/loginByMobileNo.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/loginByEmail')
  async loginByEmail(@Body() loginByEmailDto: LoginByEmailDto) {
    return await this.authService.loginByEmail(
      loginByEmailDto.email,
      loginByEmailDto.password,
    );
  }

  @Post('/loginByMobileNo')
  async loginByMobileNo(@Body() loginByMobileNoDto: LoginByMobileNoDto) {
    return await this.authService.loginByMobileNo(
      loginByMobileNoDto.mobileNo,
      loginByMobileNoDto.password,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/updatepassword')
  async updatePassword(@Req() req,
   @Body('oldPassword')oldPassword : string , 
   @Body('newPassword')newPassword : string){
    return await this.authService.updateUserPassword(req.user.userId,oldPassword,newPassword);
  }
}
