import { IsNumber, IsString } from 'class-validator';

export class CreateProductDTO {

    @IsNumber()
    id: number;

    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsString()
    price: string;
}