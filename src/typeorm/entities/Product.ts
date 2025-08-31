import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name : 'products'})
export class Product{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    productName : string
    @CreateDateColumn()
    createdAt : Date;
    @UpdateDateColumn()
    updatedAt : Date;
    @Column()
    manufacturer : string
    @Column()
    quantity : number

}