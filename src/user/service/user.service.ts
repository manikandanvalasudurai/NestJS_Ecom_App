import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/typeorm/entities/User';
import { RegisterUserDto } from '../dtos/registerUser.dto';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository : Repository<User>){}


    loginByEmail(){}

    loginByMobileNo(){}

    async createUser(registerUserDto : RegisterUserDto){
        const existingEmail = await this.userRepository.findOne({
        where: { email: registerUserDto.email },
        });

        const existingMobileNo = await this.userRepository.findOne({
        where: { mobileNo: registerUserDto.mobileNo },
        });

        if (existingEmail) {
            throw new Error('User with this email already exists');
        }
        if(existingMobileNo){
            throw new Error('User with this Mobile Number already exists')
        }

        this.userRepository.save(registerUserDto);
    }
}
