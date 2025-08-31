  import { Module } from '@nestjs/common';
  import { AuthController } from 'src/auth/controller/auth.controller'
  import { AuthService } from '../service/auth.service';
  import { JwtModule } from '@nestjs/jwt';
  import { TypeOrmModule } from '@nestjs/typeorm';
  import { User } from 'src/typeorm/entities/User';
  import { JwtStrategy } from 'src/strategy/JwtStrategy';
  import { RolesGuard } from '../guards/roles.guard';

  @Module({
    imports : [
      JwtModule.register({}),
      TypeOrmModule.forFeature([User]),
    ],
    controllers: [AuthController],
    providers: [AuthService,JwtStrategy,RolesGuard],
  })
  export class AuthModule {}
