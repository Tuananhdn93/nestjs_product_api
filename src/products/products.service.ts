import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { Category } from 'src/categories/entities/category.entity';


@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    private categoriesService: CategoriesService,
  ) {}

  async create(createProductInput: CreateProductInput): Promise<Product> {
    const category = await this.categoriesService.findOne(
      createProductInput.categoryId,
    );
    if (!category) {
      throw new NotFoundException(
        `Category with ID ${createProductInput.categoryId} not found`,
      );
    }
    const newProduct = this.productsRepository.create(createProductInput);
    newProduct.category = category;
    return this.productsRepository.save(newProduct);
  }

  async findAll(): Promise<Product[]> {
    return this.productsRepository.find({ relations: ['category'] });
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productsRepository.findOneOrFail({
      where: { id },
      relations: ['category'],
    });
    return product;
  }

  async update(
    id: string,
    updateProductInput: UpdateProductInput,
  ): Promise<Product> {
    const product = await this.findOne(id);

    if (updateProductInput.categoryId) {
      const category = await this.categoriesService.findOne(
        updateProductInput.categoryId,
      );
      if (!category) {
        throw new NotFoundException(
          `Category with ID ${updateProductInput.categoryId} not found`,
        );
      }
      product.category = category;
      product.categoryId = updateProductInput.categoryId;
    }

    Object.assign(product, updateProductInput);
    return this.productsRepository.save(product);
  }

  async remove(id: string): Promise<Product> {
    const product = await this.findOne(id);
    await this.productsRepository.remove(product);
    return product;
  }

  async getCategory(productId: string): Promise<Category> {
    const product = await this.findOne(productId);
    return product.category;
  }
}