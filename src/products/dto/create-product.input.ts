import { InputType, Field, Float, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsNumber, IsUUID } from 'class-validator';

@InputType()
export class CreateProductInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field(() => Float)
  @IsNumber()
  price: number;

  @Field()
  @IsString()
  description: string;

  @Field(() => ID)
  @IsUUID()
  categoryId: string;
}