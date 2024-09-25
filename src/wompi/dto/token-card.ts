import { ApiProperty } from "@nestjs/swagger";

export class CreateTokenCardDto {
    @ApiProperty()
    number: string;
    @ApiProperty()
    cvc: string;
    @ApiProperty()
    exp_month: string;
    @ApiProperty()
    exp_year: string;
    @ApiProperty()
    card_holder: string;
  }