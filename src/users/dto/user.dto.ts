import { IsEmail, IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class UserDto {
	@IsString()
	name: string;
	@IsString()
	surname: string;
	@IsString()
	password: string;
	@IsEmail()
	@IsOptional()
	email?: string;
	@IsPhoneNumber('RU')
	@IsOptional()
	phone?: string;
	@IsString()
	@IsOptional()
	username?: string;
}