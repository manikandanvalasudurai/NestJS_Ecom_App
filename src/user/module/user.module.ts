import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { UserController } from '../controller/user.controller';
import { UserService } from '../service/user.service';

@Module({
  imports : [TypeOrmModule.forFeature([User])],
  controllers : [UserController],
  providers : [UserService],
  exports : [UserService], //validators requires
})
export class UserModule {
}
