import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { CreateProductInput } from './create-product.input';
import { IsUUID, IsOptional } from 'class-validator';

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {
    @Field(() => ID)
    @IsUUID()
    @IsOptional()
    id: string
}