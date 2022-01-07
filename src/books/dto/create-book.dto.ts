import { IsMongoId, IsNumber, IsOptional, IsString, IsUrl } from "class-validator";

export class CreateBookDto {
	@IsMongoId()
	userId: string;
	@IsString()
	title: string;
	@IsString()
	@IsOptional()
	author?: string;
	@IsUrl()
	@IsOptional()
	photo?: string;
	@IsNumber()
	@IsOptional()
	finishUntil?: number;
}