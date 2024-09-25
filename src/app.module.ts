import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products/entities/product.entity';
import { DataSource } from 'typeorm';
import { TransactionsModule } from './transactions/transactions.module';
import { Transaction } from './transactions/entities/transaction.entity';
import { WompiModule } from './wompi/wompi.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'autorack.proxy.rlwy.net',
      port: 51860,
      username: 'root',
      password: 'XTWbHIwKvJYawUJZRJNtxNTWvTehKCeb',
      database: 'wompi',
      entities: [Product, Transaction],
      synchronize: true,
    }),
    ProductsModule, TransactionsModule, WompiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

 
} 
