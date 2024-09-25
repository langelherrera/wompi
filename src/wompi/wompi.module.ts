import { Module } from '@nestjs/common';
import { WompiService } from './wompi.service';
import { WompiController } from './wompi.controller';
import { TransactionsService } from 'src/transactions/transactions.service';
import { TransactionsModule } from 'src/transactions/transactions.module';

@Module({
  controllers: [WompiController],
  providers: [WompiService],
  imports:[TransactionsModule]
})
export class WompiModule {}
