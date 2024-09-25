import { HttpException, HttpStatus, Injectable, Post } from '@nestjs/common';
import { CreateWompiDto } from './dto/create-wompi.dto';
import axios from 'axios';
import { CreateWompiTransactionDto } from './dto/create-wompi-transaction';
import { CreateTokenCardDto } from './dto/token-card';
import { TransactionsService } from 'src/transactions/transactions.service';

@Injectable()
 export class WompiService {

  constructor(private readonly transactionService: TransactionsService) {}

  private private_key:string="prv_stagtest_5i0ZGIGiFcDQifYsXxvsny7Y37tKqFWg";
  private public_key:string="pub_stagtest_g2u0HQd3ZMh05hsSgTS2lUV8t3s4mOt7";
                                          
  
  private host_wompi:string="https://api-sandbox.co.uat.wompi.dev/v1";
  
  async createPaymentMethod(createWompiDto: CreateWompiDto) {
    //crea fuente de pago
   // const privateKey='prv_stagint_lTEnn9pj5ugWuyiKzFZVIP7SKsImvCh7';
    const payload=JSON.stringify(createWompiDto);
    const config = {
      headers: { 'Authorization': `Bearer ${this.private_key}`,
                'Content-Type': 'application/json',
              },
      };
      
   const response= await axios.post(`${this.host_wompi}/payment_sources`,payload,config);
   
   if(response.status===201) {
      return {id:response.data.data.id}
   }else{ 
      return  {paymentMethod:false}
   }  
    
  }

  async createTransaction(createWompiTransaction:CreateWompiTransactionDto){
    
     
        const config = {
          headers: { 'Authorization': `Bearer ${this.private_key}`,
                    'Content-Type': 'application/json',
                  },
          };
        const responseWompi= await axios.post(`${this.host_wompi}/transactions`,createWompiTransaction,config);
        
        
        return responseWompi.data;
        
      

      
  }

 async  webhook(tr) {
    
   // this.transactionService.updateTrByreference(tr.data.transaction.reference,tr.data.transaction.status)
    throw new HttpException('Operación exitosa', HttpStatus.OK);
  }

  async createTokenCard(crearetokenCard:CreateTokenCardDto) {

    
    const config = {
      headers: {  'Authorization': `Bearer ${this.public_key}`,
                'Content-Type': 'application/json',
              },
      };
 
    
    const response  =await axios.post(`${this.host_wompi}/tokens/cards`,crearetokenCard, config)
    
    if(response.status=201){
     
      return response.data.data.id;
    }else{
      return `error`;
    }
    
  }

  async acceptanceToken() {
   
    const response = await axios.get(`${this.host_wompi}/merchants/${this.public_key}`);
    if(response.status==200){
      const responseData=response.data;
      const {data}= responseData;
      const {presigned_acceptance}=data;
      const {acceptance_token}=presigned_acceptance;
      return acceptance_token;
      
    }else{
      return "error";
    }
  }

  async getWompitr(reference:string){
    const config = {
      headers: { 'Authorization': `Bearer ${this.private_key}`,
                'Content-Type': 'application/json',
              },
      };
    const response = await axios.get(`${this.host_wompi}/transactions/?reference=${reference}`,config);
    if(response.status=200){
      return response.data;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} wompi`;
  }
}
