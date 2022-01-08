import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BooksController } from "./books.controller";
import { BooksRepository } from "./books.repository";
import { Book, BookSchema } from "./book.schema";
import { BooksService } from "./books.service";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Module({
	imports: [MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }])],
	controllers: [BooksController],
	providers: [
		BooksService,
		BooksRepository,
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard
		}
	]
})

export class BooksModule { }