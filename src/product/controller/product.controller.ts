import { Controller, Post, Get, Patch, Delete, Body,UseGuards,Param } from '@nestjs/common';
import { CreateProductDto } from '../dtos/createProduct.dto';
import { ProductService } from '../service/product.service';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { Role } from 'src/user/roles/roles.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('product')
@UseGuards(AuthGuard('jwt') , RolesGuard) // enforce JWT & roles for this controller
export class ProductController {
    constructor(private productService : ProductService){}
    @Post('/createProduct')
    @Roles(Role.ADMIN)
    async createProduct(@Body() createProductdto : CreateProductDto){
        return await this.productService.createProduct(createProductdto);
    }

    @Get()
    readProducts() {
        return this.productService.findAll();
    }

    @Get(':id')
    readOne(@Param('id') id: string) {
        return this.productService.findOne(+id); //unary plus operator converts "5" string into 5 number.
    }

    @Patch(':id')
    @Roles(Role.ADMIN)
    updateProduct(@Param('id') id: string, @Body() createProductDto: CreateProductDto) {
        return this.productService.updateProduct(+id, createProductDto);
    }
    
    @Delete(':id')
    @Roles(Role.ADMIN)
    deleteProduct(@Param('id') id: string) {
        return this.productService.deleteProduct(+id);
    }
}
