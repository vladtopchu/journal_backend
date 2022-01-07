import { IsOptional, IsString } from "class-validator"

export class UpdateBookDto {
	@IsString()
	@IsOptional()
	title?: string
	@IsString()
	@IsOptional()
	author?: string
	@IsString()
	@IsOptional()
	photo?: string
	@IsString()
	@IsOptional()
	finishUntil?: number
}