import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { Category } from '../../categories/entities/category.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Product {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid') // Sử dụng UUID cho ID
  id: string;

  @Field()
  @Column()
  name: string;

  @Field(() => Float)
  @Column('decimal', { precision: 10, scale: 2 }) // Số thập phân, độ chính xác 10, 2 chữ số sau dấu phẩy
  price: number;

  @Field()
  @Column()
  description: string;

  @Field(() => ID)
  @Column()
  categoryId: string;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: 'CASCADE', // Xóa sản phẩm khi danh mục liên quan bị xóa
  })
  @JoinColumn({ name: 'categoryId' }) // Chỉ định cột khóa ngoại
  @Field(() => Category)
  category: Category;
}