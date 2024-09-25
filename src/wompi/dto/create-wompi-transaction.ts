import { ApiProperty } from "@nestjs/swagger";

export class CreateWompiTransactionDto {
    @ApiProperty()
    acceptance_token:string;
    @ApiProperty()
    amount_in_cents:number;
    @ApiProperty()
    currency:string;
    @ApiProperty()
    signature:string;
    @ApiProperty()
    customer_email:string;
    @ApiProperty()
    payment_method:{
        
        type:string,
        
        installments:number,
        
        token:string;
        //sandbox_status:string;
    }
    @ApiProperty()
    payment_source_id:number;
    @ApiProperty()
    recurrent:boolean;
    @ApiProperty()
    reference:string;
    @ApiProperty()
    expiration_time:string;
    /*
    redirect_url:string;
   
    
    customer_data: {
        phone_number: string;
        full_name:string,
        legal_id:string,
        legal_id_type:string
    }
    shipping_address: {
        address_line_1:string,
        address_line_2:string,
        country:string,
        region:string,
        city:string,
        name:string,
        phone_number:string,
        postal_code:string
    }*/
}