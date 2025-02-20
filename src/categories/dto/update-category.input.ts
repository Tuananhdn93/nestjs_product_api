import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { CreateCategoryInput } from './create-category.input';
import { IsUUID, IsOptional } from 'class-validator';

@InputType()
export class UpdateCategoryInput extends PartialType(CreateCategoryInput) {
  @Field(() => ID)
  @IsUUID()
  @IsOptional()
  id: string;
}