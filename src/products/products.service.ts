import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  // CREAR
  create(dto: CreateProductDto) {
    const product = this.productRepository.create(dto);
    this.productRepository.save(product);
    return 'Producto Creado'
  }

  // VER TODOS
  findAll() {
    return this.productRepository.find();
  }

  // VER UNO
  async findOne(id: number) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }
    return product;
  }

  // ACTUALIZAR
  async updateProduct(id: number, dto: UpdateProductDto) {
    const product = await this.findOne(id);
    Object.assign(product, dto);
    await this.productRepository.save(product);
    return 'Producto actualizado';
  }

  // ELIMINAR
  async deleteProduct(id: number) {
    await this.findOne(id);
    await this.productRepository.delete(id);
    return 'Producto eliminado';
  }
}
