import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { Transaction } from './entities/transaction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Transaction]),TransactionsModule],
  controllers: [TransactionsController],
  providers: [TransactionsService],
  exports:[TransactionsService]
})
export class TransactionsModule {}
