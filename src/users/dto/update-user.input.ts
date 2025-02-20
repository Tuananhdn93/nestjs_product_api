import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { CreateUserInput } from './create-user.input';
import { IsUUID, IsOptional } from 'class-validator';


@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => ID)
  @IsUUID()
  @IsOptional()
  id: string;
}