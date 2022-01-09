import { IsOptional, IsString } from "class-validator";

export class CreateBookNoteDto {
	@IsOptional()
	@IsString()
	userId: string;
	@IsString()
	bookId: string;
	@IsString()
	note: string;
	@IsString()
	@IsOptional()
	page?: string;
}