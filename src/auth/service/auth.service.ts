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

    const payload = { sub: user.id, email: user.email };
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: JWT_SECRET_KEY,
    });
    return {
      statusCode: 201,
      message: 'Login successful',
      accessToken: await this.signToken(user.id, user.email),
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
    const payload = { sub: user.id, mobileNo: user.mobileNo };
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: JWT_SECRET_KEY,
    });
    return {
      statusCode: 201,
      message: 'Login successful',
      accessToken: await this.signToken(user.id, user.mobileNo.toString()),
    };
  }

  async signToken(userId : number , email : string) : Promise<string>{
    const payload = {
      sub : userId,
      email
    }
    return await this.jwt.signAsync(payload , {
      expiresIn : '15m',
      secret : JWT_SECRET_KEY
    });
  }

}
