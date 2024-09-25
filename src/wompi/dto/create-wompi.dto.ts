import { ApiProperty } from "@nestjs/swagger";

export class CreateWompiDto {
    @ApiProperty()
    type:string;
    @ApiProperty()
    token:string;
    @ApiProperty()
    customer_email:string;
    @ApiProperty()
    acceptance_token:string;
}
