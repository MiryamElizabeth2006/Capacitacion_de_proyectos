import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  finAll() {
    return this.productsService.findAll()
  }

  @Post() 
  create(@Body() dto: CreateProductDto){
    return this.productsService.create(dto)
  }

  @Get(':id')
  findOne(@Param('id')id:string) {
    return this.productsService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id')id: string, @Body() dto: UpdateProductDto){
    return this.productsService.updateProduct(+id, dto)
  }

  @Delete(':id')
  delete(@Param('id') id: string){
    return this.productsService.deleteProduct(+id)
  }
}
