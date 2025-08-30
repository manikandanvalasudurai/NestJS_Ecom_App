import { Module } from '@nestjs/common';
import { CartController } from '../controller/cart.controller';
import { CartService } from '../service/cart.service';

@Module({
  controllers: [CartController],
  providers: [CartService]
})
export class CartModule {}
