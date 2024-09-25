import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WompiService } from './wompi.service';
import { CreateWompiDto } from './dto/create-wompi.dto';
import { UpdateWompiDto } from './dto/update-wompi.dto';
import { CreateWompiTransactionDto } from './dto/create-wompi-transaction';
import { TransactionUpdatedDto } from './dto/event-wompi-tr';
import { CreateTokenCardDto } from './dto/token-card';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('wompi')
@ApiTags('wompi')
export class WompiController {
  constructor(private readonly wompiService: WompiService) {}
  
  
  
  @Post()
  @ApiBody({ type: [CreateWompiDto] })
  createPaymentMethod(@Body() createWompiDto: CreateWompiDto) {
    return this.wompiService.createPaymentMethod(createWompiDto);
  }

  @Post('transaction')
  @ApiBody({ type: [CreateWompiTransactionDto] })
  createTransation(@Body() createWompiTransactionDto:CreateWompiTransactionDto){
    return this.wompiService.createTransaction(createWompiTransactionDto);
  }

  @Post('validate')
  @ApiBody({ type: [TransactionUpdatedDto] })
  validateTransaction(@Body() tr:TransactionUpdatedDto) {
 
    return this.wompiService.webhook(tr);
  }

  @Get('validate')
  findOne() {
    console.log('validando redireccion');
    return "";
  }

  @Post('token/card')
  @ApiBody({ type: [CreateTokenCardDto] })
  tokenCard(@Body() createTokenCard:CreateTokenCardDto) {
  
    
    return this.wompiService.createTokenCard(createTokenCard);
  }

  @Get('acceptance_token')
  remove() {
   
    return this.wompiService.acceptanceToken();
  }

  @Get('reference/:reference')
  getWompiTrByReference(@Param('reference') reference:string){
    return this.wompiService.getWompitr(reference);
  }
}

