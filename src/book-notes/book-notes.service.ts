import { Injectable } from "@nestjs/common";
import { BookNote } from "./book-note.schema";
import { BookNotesRepository } from "./book-notes.repository";
import { CreateBookNoteDto } from "./dto/create-book-note.dto";

@Injectable()
export class BookNotesService {
	constructor(
		private bookNotesRepository: BookNotesRepository
	) { }

	async getNoteById(noteId: string): Promise<BookNote> {
		return this.bookNotesRepository.findNoteById(noteId)
	}

	async getBooksNotes(userId: string, bookId: string): Promise<BookNote[]> {
		return this.bookNotesRepository.findMatching({ userId, bookId })
	}

	async createBookNote(createBookNoteDto: CreateBookNoteDto) {
		return this.bookNotesRepository.createBookNote(createBookNoteDto)
	}

	async deleteBookNote(noteId: string) {
		return this.bookNotesRepository.deleteBookNote(noteId)
	}
}