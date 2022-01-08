import { IsEmail, IsOptional, IsPhoneNumber, IsString } from "class-validator";
import { Role } from "src/auth/utils/role.enum";

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
	@IsOptional()
	role?: Role = Role.User
}