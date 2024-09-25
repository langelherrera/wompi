import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { MoreThan, Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  
  
  
  constructor(
    @InjectRepository(Product)
    private productRepository:Repository<Product>){
    
  }
  
  async create(createProductDto: CreateProductDto) {
    return await this.productRepository.save(createProductDto);
  }

  async findAll() {
    return await this.productRepository.find(
      {
        where: {
          stock: MoreThan(0)  
        }
      }
    );
  }

  async findOne(id: number) {
    return  await this.productRepository.findOneBy({id});
  }

 async  update(id: number, updateProductDto: UpdateProductDto) {
    return  await this.productRepository.update(id, updateProductDto); 
  }

  async remove(id: number) {
    return await `This action removes a #${id} product`;
  }

  async updateStock(id:number){

    
    let product =new Product();
    product = await this.findOne(id);
    
    product.stock-=1;
    
    return await  this.update(id,product);
  }
}
