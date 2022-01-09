import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { BookNote, BookNoteDocument } from "./book-note.schema";
import { CreateBookNoteDto } from "./dto/create-book-note.dto";

@Injectable()
export class BookNotesRepository {
	constructor(@InjectModel(BookNote.name) private bookNoteModel: Model<BookNoteDocument>) { }

	async findNoteById(noteId: string): Promise<BookNote> {
		return this.bookNoteModel.findById(noteId)
	}

	async findMatching(filterQuery: FilterQuery<BookNote>): Promise<BookNote[]> {
		return this.bookNoteModel.find(filterQuery)
	}

	async createBookNote(bookNote: BookNote): Promise<BookNote> {
		const newBookNote = new this.bookNoteModel(bookNote)
		return newBookNote.save()
	}

	async deleteBookNote(noteId: string): Promise<any> {
		return this.bookNoteModel.deleteOne({ _id: noteId })
	}

	async findByIdAndUpdate(id: string, book: Partial<BookNote>): Promise<BookNote> {
		// By default, Mongo returning old record on update; 
		// So to fix this, we should set option new to true
		return this.bookNoteModel.findByIdAndUpdate(id, book, { new: true })
	}
}