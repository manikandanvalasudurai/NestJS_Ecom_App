import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateProductDto{
    @IsString()
    @IsNotEmpty()
    productName : string
    @IsString()
    @IsNotEmpty()
    manufacturer : string
    @IsNumber()
    @IsNotEmpty()
    quantity : number
}