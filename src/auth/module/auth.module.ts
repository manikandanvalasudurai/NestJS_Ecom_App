  import { Module } from '@nestjs/common';
  import { AuthController } from '../controller/auth.controller';
  import { AuthService } from '../service/auth.service';
  import { JwtModule } from '@nestjs/jwt';
  import { TypeOrmModule } from '@nestjs/typeorm';
  import { User } from 'src/typeorm/entities/User';
  import { JwtStrategy } from 'src/strategy/JwtStrategy';

  @Module({
    imports : [
      JwtModule.register({}),
      TypeOrmModule.forFeature([User]),
    ],
    controllers: [AuthController],
    providers: [AuthService,JwtStrategy],
  })
  export class AuthModule {}
