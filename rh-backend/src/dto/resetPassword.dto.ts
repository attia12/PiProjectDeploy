/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class ResetPasswordDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
   
    otp: number;

    @IsNotEmpty()
    @IsString()
    newPassword: string;

}
