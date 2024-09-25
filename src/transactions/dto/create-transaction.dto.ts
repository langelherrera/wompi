import { Product } from "src/products/entities/product.entity";
import { ApiProperty } from '@nestjs/swagger'
export class CreateTransactionDto {
   
    id:number;
    
    reference:string;
    @ApiProperty({
        description: 'Descripción de la transaccion',
        
      })
    description:string;
    @ApiProperty(
        {
            description: 'Estado de la transacción',
            default: 'NEW',
          }
    )
    status:string;
    @ApiProperty(
        {
            description: 'monto de la transacción',
           
        }
    )
    amount:number;
    @ApiProperty(
        {
            description: 'id del producto a comprar',
           
        }
    )
    product: Product;
   
    secretIntegrity:string
    dateExpiration:string;
}
