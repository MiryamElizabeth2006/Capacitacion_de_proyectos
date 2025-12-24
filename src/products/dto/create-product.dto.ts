import { IsString, IsNotEmpty, Min} from "class-validator";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @Min(0)
    price: number

    @IsString()
    description: string
}
