import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { createHash } from 'crypto';
import * as moment from 'moment';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
@Injectable()
export class TransactionsService {
  
  private stagtest_integrity:string="stagtest_integrity_nAIBuqayW70XpUqJS4qf4STYiISd89Fp";
  
  constructor(
    @InjectRepository(Transaction)
    private trasactionRepository:Repository<Transaction>
  ){}
  
  async create(createTransactionDto: CreateTransactionDto) {
    const secretoIntegrity = this.stagtest_integrity;
    const reference=createTransactionDto.reference= uuidv4();
    const monto=createTransactionDto.amount*100;
    const montoString =monto.toString();
    const fechaActual = new Date();
    fechaActual.setHours(fechaActual.getHours() + 24);
    const fechaExpiracion=fechaActual.toISOString();
   
    const secret =reference+montoString+"COP"+fechaExpiracion+this.stagtest_integrity;
    
    /*
    const encondedText = new TextEncoder().encode(secret);
    const hashBuffer = await crypto.subtle.digest("SHA-256", encondedText);
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
      */
     
    /*
    const encodedText: Uint8Array = new TextEncoder().encode(secret);
    const hashBuffer: ArrayBuffer = await crypto.subtle.digest("SHA-256", encodedText);
    const hashArray: number[] = Array.from(new Uint8Array(hashBuffer));
    const hashHex: string = hashArray.map((b: number) => b.toString(16).padStart(2, "0")).join("");*/

    async function generateHash(secret: string): Promise<string> {
      // Crear el hash usando el algoritmo SHA-256
      const hash = createHash('sha256');
      
      // Actualizar el hash con el texto a codificar (equivalente a TextEncoder().encode())
      hash.update(secret);
    
      // Obtener el hash en formato hexadecimal (equivalente al proceso de hashArray.map().join())
      const hashHex = hash.digest('hex');
    
      return hashHex;
    }

    generateHash(secret).then((hashHex) => {
      createTransactionDto.secretIntegrity=hashHex;
    });
    createTransactionDto.amount=monto;
    //createTransactionDto.secretIntegrity=this.hashHex;
    createTransactionDto.dateExpiration=fechaExpiracion;

    return await this.trasactionRepository.save(createTransactionDto);
  }

   async findAll() {
    return  await this.trasactionRepository.find({relations:['product']});
  }

  async findOne(id: number) {
    return await this.trasactionRepository.findOneBy({id});
  }

 async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return await this.trasactionRepository.update(id,updateTransactionDto);
  }

 async  remove(id: number) {
    return await `This action removes a #${id} transaction`;
  }

  async updateTrByreference(reference:string,status:string){
    
    try{
      let tr = new CreateTransactionDto();
      tr = await this.getByReference(reference);
      const id =tr.id;
      const estado=status;
      tr.id=id;
      tr.status=estado;
      await this.update(id,tr)
    }catch{

      throw new HttpException('se esta enviando transacciones desde otro servidor',HttpStatus.BAD_GATEWAY);
    }


    
   
   
    
  }

  async getByReference(reference:string){
    return await this.trasactionRepository.findOneBy({reference})
  }
}



