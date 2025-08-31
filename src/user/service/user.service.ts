import { UnauthorizedException,BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/typeorm/entities/User';
import { RegisterUserDto } from '../dtos/registerUser.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository : Repository<User>,
                private jwt : JwtService){}

    async createUser(registerUserDto : RegisterUserDto){
        const existingEmail = await this.userRepository.findOne({
        where: { email: registerUserDto.email },
        });

        const existingMobileNo = await this.userRepository.findOne({
        where: { mobileNo: registerUserDto.mobileNo },
        });

        if (existingEmail) {
            throw new BadRequestException({
                statusCode : 400,
                message: 'User with this email already exists',
                error: 'Bad Request',
            });
        }
        if (existingMobileNo) {
            throw new BadRequestException({
                statusCode: 400,
                message: 'User with this mobile number already exists',
                error: 'Bad Request',
            });
        }

        const hashedPassword = await bcrypt.hash(registerUserDto.password , 10);
        const user = this.userRepository.create( {...registerUserDto,password : hashedPassword});
        await this.userRepository.save(user);
        return { message : 'User registered successfully'};
    }
}
