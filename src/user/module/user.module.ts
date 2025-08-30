import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { UserController } from '../controller/user.controller';
import { UserService } from '../service/user.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports : [JwtModule.register({
    secret : 'BCRYPT_SECRET_KEY'
  }),TypeOrmModule.forFeature([User])],
  controllers : [UserController],
  providers : [UserService],
  exports : [UserService], //validators requires
})
export class UserModule {
}
