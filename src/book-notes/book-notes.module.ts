import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BookNotesController } from "./book-notes.controller";
import { BookNote, BookNoteSchema } from "./book-note.schema";
import { BookNotesService } from "./book-notes.service";
import { BookNotesRepository } from "./book-notes.repository";
import { BooksModule } from "src/books/books.module";
import { BooksService } from "src/books/books.service";

@Module({
	imports: [MongooseModule.forFeature([{ name: BookNote.name, schema: BookNoteSchema }]), BooksModule],
	controllers: [BookNotesController],
	providers: [
		BookNotesService,
		BookNotesRepository,
		BooksService
	],
	exports: [
		BookNotesService,
		BookNotesRepository
	]
})

export class BookNotesModule { }