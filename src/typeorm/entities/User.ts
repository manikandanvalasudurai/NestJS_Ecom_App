import { Column, Entity,PrimaryGeneratedColumn } from "typeorm";
import { Role } from "src/user/roles/roles.enum";

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

  @Column({
    type : 'enum',
    enum : Role,
    default : Role.USER,
  })
  role : Role;
}
