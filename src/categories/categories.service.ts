import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  create(createCategoryInput: CreateCategoryInput): Promise<Category> {
    const newCategory = this.categoriesRepository.create(createCategoryInput);
    return this.categoriesRepository.save(newCategory);
  }

  findAll(): Promise<Category[]> {
    return this.categoriesRepository.find();
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.categoriesRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async update(
    id: string,
    updateCategoryInput: UpdateCategoryInput,
  ): Promise<Category> {
     const category = await this.findOne(id);
     return this.categoriesRepository.save(category);

  }

  async remove(id: string): Promise<Category> {
    const category = await this.findOne(id);
    await this.categoriesRepository.remove(category);
      return category
  }
}