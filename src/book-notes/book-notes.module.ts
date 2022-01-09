import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BookNotesController } from "./book-notes.controller";
import { BookNote, BookNoteSchema } from "./book-note.schema";
import { BookNotesService } from "./book-notes.service";

@Module({
	imports: [MongooseModule.forFeature([{ name: BookNote.name, schema: BookNoteSchema }])],
	controllers: [BookNotesController],
	providers: [BookNotesService]
})

export class BookNotesModule { }