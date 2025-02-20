import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Product } from '../../products/entities/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@ObjectType()
@Entity()
export class Category {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @OneToMany(() => Product, (product) => product.category)
  @Field(() => [Product], { nullable: true }) // Đặt nullable: true
  products?: Product[];
}