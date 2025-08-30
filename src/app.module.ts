import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/module/user.module';
import { ProductModule } from './product/module/product.module';
import { CartModule} from './cart/module/cart.module';
import { AuthModule } from './auth/module/auth.module';
@Module({
  imports: [TypeOrmModule.forRoot({
      type : 'mysql',
      host : 'localhost',
      port : 3306,
      username : 'root',
      password : 'Manikandan@02',
      database : 'ecommerce_backend_database',
      autoLoadEntities: true,
      entities : [],
      synchronize : true,
  }),UserModule, ProductModule, CartModule, AuthModule],
})
export class AppModule {}
