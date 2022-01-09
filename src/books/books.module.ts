import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BooksController } from "./books.controller";
import { BooksRepository } from "./books.repository";
import { Book, BookSchema } from "./book.schema";
import { BooksService } from "./books.service";

@Module({
	imports: [MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }])],
	controllers: [BooksController],
	providers: [
		BooksService,
		BooksRepository
	],
	exports: [
		BooksService,
		BooksRepository
	]
})

export class BooksModule { }