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


    async loginByEmail(email : string , password : string){
        const user  = await this.userRepository.findOne({ where: { email } });
        if(!user ){ //mail check
            throw new UnauthorizedException({
                statusCode: 401,
                message: 'Invalid email or password',
                error: 'Unauthorized',
            });
        }
        const isMatch = await bcrypt.compare(password, user.password); 
        if (!isMatch) {
            throw new UnauthorizedException({
                statusCode: 401,
                message: 'Invalid email or password',
                error: 'Unauthorized',
            });
        }
        const payload = { id: user.id, email: user.email };
        const token = this.jwt.sign(payload);
        return {
            accessToken : token,
        };
    }

    async loginByMobileNo(mobileNo : number , password : string){
        const user  = await this.userRepository.findOne({ where: { mobileNo } });
        if(!user ){ //mobileNo check
            throw new UnauthorizedException({
                statusCode: 401,
                message: 'Invalid email or password',
                error: 'Unauthorized',
            });
        }
        const isMatch = await bcrypt.compare(password, user.password); 
        if (!isMatch) {
            throw new UnauthorizedException({
                statusCode: 401,
                message: 'Invalid email or password',
                error: 'Unauthorized',
            });
        }
        const payload = { id : user.id , password : user.password};
        const token = this.jwt.sign(payload);
        return {
             accessToken : token,
        };
    }

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
