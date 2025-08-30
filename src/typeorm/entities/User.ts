import { IsEmail, IsNotEmpty, IsNumber, IsString, Validate , } from "class-validator";
import { Column, Entity,PrimaryGeneratedColumn } from "typeorm";

@Entity({ name : 'users'})
export class User{
    @PrimaryGeneratedColumn()
    id : number

    @IsString()
    @IsNotEmpty()
    @Column()
    username : string

    @IsEmail()
    @IsNotEmpty()
    @Column()
    email : string

    @IsNumber()
    @IsNotEmpty()
    @Column()
    mobileNo : number

    @IsString()
    @IsNotEmpty()
    @Column()
    password : string
}