import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateAuthDto {
    @IsOptional()
    id?: number

    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    username: string;

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    password: string;
}
