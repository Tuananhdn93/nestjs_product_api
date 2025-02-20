import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { Product } from './products/entities/product.entity';
import { Category } from './categories/entities/category.entity';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306, 
      username: 'root',
      password: '',
      database: 'nestjs_api', 
      entities: [Product, Category,User],
      synchronize: true,
    }),
    ProductsModule,
    CategoriesModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}