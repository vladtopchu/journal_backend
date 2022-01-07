import { IsEmail, IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class AuthDto {
	@IsEmail()
	@IsOptional()
	email?: string;
	@IsPhoneNumber("RU")
	@IsOptional()
	phone?: string;
	@IsString()
	password: string;
}