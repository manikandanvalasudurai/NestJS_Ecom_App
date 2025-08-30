import { IsEmail, IsNotEmpty, IsNumber, IsString, Validate , } from "class-validator";
import { Column, Entity,PrimaryGeneratedColumn } from "typeorm";

@Entity({ name : 'users'})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column({ type: 'bigint' })
  mobileNo: number;

  @Column()
  password: string;
}
