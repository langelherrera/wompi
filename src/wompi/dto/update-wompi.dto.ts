import { PartialType } from '@nestjs/mapped-types';
import { CreateWompiDto } from './create-wompi.dto';

export class UpdateWompiDto extends PartialType(CreateWompiDto) {}
