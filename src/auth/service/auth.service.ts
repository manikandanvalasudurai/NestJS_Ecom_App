import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWT_SECRET_KEY } from 'src/config/auth.config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/typeorm/entities/User';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findAllUsers(){
    return await this.userRepository.find();
  }

  async loginByEmail(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException({
        statusCode: 401,
        message: 'Invalid email',
        error: 'Unauthorized',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException({
        statusCode: 401,
        message: 'Invalid password',
        error: 'Unauthorized',
      });
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: JWT_SECRET_KEY,
    });
    return {
      statusCode: 201,
      message: 'Login successful',
      accessToken: await this.signToken(user.id, user.email,user.role),
    };
  }

  async loginByMobileNo(mobileNo: number, password: string) {
    const user = await this.userRepository.findOne({ where: { mobileNo } });
    if (!user) {
      throw new UnauthorizedException({
        statusCode: 401,
        message: 'Invalid mobile',
        error: 'Unauthorized',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException({
        statusCode: 401,
        message: 'Invalid password',
        error: 'Unauthorized',
      });
    }
    const payload = { sub: user.id, mobileNo: user.mobileNo, role: user.role };
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: JWT_SECRET_KEY,
    });
    return {
      statusCode: 201,
      message: 'Login successful',
      accessToken: await this.signToken(user.id, user.mobileNo.toString(),user.role),
    };
  }

  async signToken(userId : number , email : string, role: string) : Promise<string>{
    const payload = {
      sub : userId,
      email,
      role,
    }
    return await this.jwt.signAsync(payload , {
      expiresIn : '15m',
      secret : JWT_SECRET_KEY
    });
  }

  async updateUserPassword(userId : number , oldPassword : string , newPassword : string){
      const user = await this.userRepository.findOne({where : { id : userId }});
      if(!user){
        throw new UnauthorizedException({
          statusCode : 201,
          message : 'Invalid UserId',
          error :  'User not exists'
        });
      }
      const isMatch = await bcrypt.compare(oldPassword , user.password);
      if(!isMatch){
         throw new UnauthorizedException({
          statusCode : 201,
          message : 'wrong password',
          error :  'please enter correct oldPassword'
        });
      }
      user.password = await bcrypt.hash(newPassword,10);
      await this.userRepository.save(user);
    }
  }
